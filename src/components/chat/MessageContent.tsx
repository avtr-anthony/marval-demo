import type { ReactNode } from 'react';

interface MessageContentProps {
    content: string;
}

interface ParagraphBlock {
    type: 'paragraph';
    text: string;
}

interface TableBlock {
    type: 'table';
    headers: string[];
    rows: string[][];
}

interface HeadingBlock {
    type: 'heading';
    level: 1 | 2 | 3 | 4 | 5 | 6;
    text: string;
}

interface ListBlock {
    type: 'list';
    ordered: boolean;
    items: string[];
    start?: number;
}

interface QuoteBlock {
    type: 'quote';
    blocks: ContentBlock[];
}

interface CodeBlock {
    type: 'code';
    language: string | null;
    code: string;
}

interface RuleBlock {
    type: 'rule';
}

type ContentBlock =
    | ParagraphBlock
    | TableBlock
    | HeadingBlock
    | ListBlock
    | QuoteBlock
    | CodeBlock
    | RuleBlock;

type InlineTokenType =
    | 'code'
    | 'link'
    | 'bold'
    | 'strike'
    | 'italic'
    | 'autolink';

interface InlineTokenMatch {
    type: InlineTokenType;
    index: number;
    match: string;
    groups: string[];
}

const HEADING_STYLES: Record<HeadingBlock['level'], string> = {
    1: 'text-xl font-semibold leading-tight sm:text-2xl',
    2: 'text-lg font-semibold leading-tight sm:text-xl',
    3: 'text-base font-semibold leading-tight sm:text-lg',
    4: 'text-sm font-semibold leading-tight sm:text-base',
    5: 'text-sm font-semibold leading-tight',
    6: 'text-xs font-semibold uppercase tracking-[0.12em] text-ink-dim',
};

const INLINE_TOKEN_PATTERNS: Array<{
    type: InlineTokenType;
    regex: RegExp;
}> = [
    { type: 'code', regex: /`([^`]+)`/ },
    { type: 'link', regex: /\[([^\]]+)\]\(([^)\s]+)\)/ },
    { type: 'bold', regex: /\*\*([\s\S]+?)\*\*|__([\s\S]+?)__/ },
    { type: 'strike', regex: /~~([\s\S]+?)~~/ },
    { type: 'italic', regex: /\*([^*\n]+)\*|_([^_\n]+)_/ },
    {
        type: 'autolink',
        regex: /(https?:\/\/[^\s<]+|mailto:[^\s<]+|tel:[^\s<]+)/,
    },
];

function parseTableCells(line: string) {
    const trimmedLine = line.trim();

    if (!trimmedLine.includes('|')) {
        return null;
    }

    const normalizedLine = trimmedLine.replace(/^\|/, '').replace(/\|$/, '');
    const cells = normalizedLine.split('|').map((cell) => cell.trim());

    return cells.length >= 2 ? cells : null;
}

function isSeparatorCell(cell: string) {
    return /^:?-{3,}:?$/.test(cell.replace(/\s+/g, ''));
}

function isMarkdownTableStart(lines: string[], index: number) {
    const headerCells = parseTableCells(lines[index]);
    const separatorCells = parseTableCells(lines[index + 1] ?? '');

    if (!headerCells || !separatorCells || headerCells.length !== separatorCells.length) {
        return false;
    }

    return separatorCells.every(isSeparatorCell);
}

function normalizeRowLength(cells: string[], expectedLength: number) {
    if (cells.length === expectedLength) {
        return cells;
    }

    if (cells.length > expectedLength) {
        return cells.slice(0, expectedLength);
    }

    return [
        ...cells,
        ...Array.from({ length: expectedLength - cells.length }, () => ''),
    ];
}

function isBlankLine(line: string) {
    return line.trim().length === 0;
}

function getHeadingMatch(line: string) {
    return line.trim().match(/^(#{1,6})\s+(.*)$/);
}

function isRuleLine(line: string) {
    return /^([-*_])(?:\s*\1){2,}$/.test(line.trim());
}

function isQuoteLine(line: string) {
    return /^\s*>\s?/.test(line);
}

function isFenceStart(line: string) {
    return /^\s*```/.test(line);
}

function getFenceLanguage(line: string) {
    const match = line.trim().match(/^```(\S+)?/);
    return match?.[1] ?? null;
}

function getListItemMatch(line: string) {
    const orderedMatch = line.match(/^\s*(\d+)\.\s+(.*)$/);

    if (orderedMatch) {
        return {
            ordered: true,
            text: orderedMatch[2],
            start: Number(orderedMatch[1]),
        };
    }

    const unorderedMatch = line.match(/^\s*[-*+]\s+(.*)$/);

    if (unorderedMatch) {
        return {
            ordered: false,
            text: unorderedMatch[1],
            start: undefined,
        };
    }

    return null;
}

function startsSpecialBlock(lines: string[], index: number) {
    const line = lines[index];

    return (
        isFenceStart(line) ||
        isMarkdownTableStart(lines, index) ||
        Boolean(getHeadingMatch(line)) ||
        isRuleLine(line) ||
        isQuoteLine(line) ||
        Boolean(getListItemMatch(line))
    );
}

function parseContentBlocks(content: string): ContentBlock[] {
    const lines = content.replace(/\r\n?/g, '\n').split('\n');
    const blocks: ContentBlock[] = [];
    let index = 0;

    while (index < lines.length) {
        const currentLine = lines[index];

        if (isBlankLine(currentLine)) {
            index += 1;
            continue;
        }

        if (isFenceStart(currentLine)) {
            const language = getFenceLanguage(currentLine);
            const codeLines: string[] = [];
            index += 1;

            while (index < lines.length && !isFenceStart(lines[index])) {
                codeLines.push(lines[index]);
                index += 1;
            }

            if (index < lines.length) {
                index += 1;
            }

            blocks.push({
                type: 'code',
                language,
                code: codeLines.join('\n'),
            });
            continue;
        }

        if (isMarkdownTableStart(lines, index)) {
            const headers = parseTableCells(currentLine) ?? [];
            const rows: string[][] = [];
            index += 2;

            while (index < lines.length) {
                const rowCells = parseTableCells(lines[index]);

                if (!rowCells) {
                    break;
                }

                rows.push(normalizeRowLength(rowCells, headers.length));
                index += 1;
            }

            blocks.push({ type: 'table', headers, rows });
            continue;
        }

        const headingMatch = getHeadingMatch(currentLine);

        if (headingMatch) {
            blocks.push({
                type: 'heading',
                level: Math.min(headingMatch[1].length, 6) as HeadingBlock['level'],
                text: headingMatch[2].trim(),
            });
            index += 1;
            continue;
        }

        if (isRuleLine(currentLine)) {
            blocks.push({ type: 'rule' });
            index += 1;
            continue;
        }

        if (isQuoteLine(currentLine)) {
            const quoteLines: string[] = [];

            while (index < lines.length && isQuoteLine(lines[index])) {
                quoteLines.push(lines[index].replace(/^\s*>\s?/, ''));
                index += 1;
            }

            blocks.push({
                type: 'quote',
                blocks: parseContentBlocks(quoteLines.join('\n')),
            });
            continue;
        }

        const listMatch = getListItemMatch(currentLine);

        if (listMatch) {
            const items = [listMatch.text];
            const ordered = listMatch.ordered;
            const start = listMatch.start;
            index += 1;

            while (index < lines.length) {
                const nextLine = lines[index];

                if (isBlankLine(nextLine)) {
                    break;
                }

                const nextListMatch = getListItemMatch(nextLine);

                if (nextListMatch && nextListMatch.ordered === ordered) {
                    items.push(nextListMatch.text);
                    index += 1;
                    continue;
                }

                if (/^\s{2,}\S/.test(nextLine)) {
                    items[items.length - 1] = `${items[items.length - 1]}\n${nextLine.trim()}`;
                    index += 1;
                    continue;
                }

                break;
            }

            blocks.push({
                type: 'list',
                ordered,
                items,
                start,
            });
            continue;
        }

        const paragraphLines = [currentLine.trimEnd()];
        index += 1;

        while (index < lines.length) {
            const nextLine = lines[index];

            if (isBlankLine(nextLine) || startsSpecialBlock(lines, index)) {
                break;
            }

            paragraphLines.push(nextLine.trimEnd());
            index += 1;
        }

        blocks.push({
            type: 'paragraph',
            text: paragraphLines.join('\n').trim(),
        });
    }

    return blocks;
}

function sanitizeUrl(url: string) {
    const trimmedUrl = url.trim();

    if (trimmedUrl.startsWith('/')) {
        return trimmedUrl;
    }

    return /^(https?:|mailto:|tel:)/i.test(trimmedUrl) ? trimmedUrl : null;
}

function isExternalUrl(url: string) {
    return /^https?:\/\//i.test(url);
}

function isNonWrappingColumn(header: string) {
    const normalizedHeader = header.trim().toLowerCase();

    return (
        normalizedHeader.includes('whatsapp') ||
        normalizedHeader.includes('celular') ||
        normalizedHeader.includes('codigo') ||
        normalizedHeader.includes('código') ||
        normalizedHeader.includes('cp') ||
        normalizedHeader.includes('telefono') ||
        normalizedHeader.includes('teléfono') ||
        normalizedHeader.includes('cuit') ||
        normalizedHeader.includes('cuil') ||
        normalizedHeader.includes('id') ||
        normalizedHeader.includes('nro') ||
        normalizedHeader.includes('número') ||
        normalizedHeader.includes('numero')
    );
}

function isNonWrappingCellValue(value: string) {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
        return false;
    }

    const compactValue = trimmedValue.replace(/\s+/g, '');

    if (/^\+?[\d()./-]{4,}$/.test(compactValue)) {
        return true;
    }

    if (/^[A-Z0-9-]{6,}$/i.test(compactValue) && !/[aeiou]/i.test(compactValue)) {
        return true;
    }

    return false;
}

function shouldPreventWrap(header: string, value: string) {
    return isNonWrappingColumn(header) || isNonWrappingCellValue(value);
}

function findNextInlineToken(text: string): InlineTokenMatch | null {
    let bestMatch: InlineTokenMatch | null = null;

    for (const pattern of INLINE_TOKEN_PATTERNS) {
        const match = pattern.regex.exec(text);

        if (!match || match.index === undefined) {
            continue;
        }

        if (bestMatch === null || match.index < bestMatch.index) {
            bestMatch = {
                type: pattern.type,
                index: match.index,
                match: match[0],
                groups: match.slice(1),
            };
        }
    }

    return bestMatch;
}

function renderInlineMarkdown(text: string, keyPrefix = 'inline'): ReactNode {
    const nodes: ReactNode[] = [];
    let remainingText = text;
    let tokenIndex = 0;

    while (remainingText.length > 0) {
        const token = findNextInlineToken(remainingText);

        if (!token) {
            nodes.push(remainingText);
            break;
        }

        if (token.index > 0) {
            nodes.push(remainingText.slice(0, token.index));
        }

        const key = `${keyPrefix}-${tokenIndex}`;

        if (token.type === 'code') {
            nodes.push(
                <code
                    key={key}
                    className="rounded bg-panel-soft px-1.5 py-0.5 font-mono text-[0.92em] text-ink"
                >
                    {token.groups[0]}
                </code>,
            );
        } else if (token.type === 'link') {
            const label = token.groups[0];
            const href = sanitizeUrl(token.groups[1]);

            nodes.push(
                href ? (
                    <a
                        key={key}
                        href={href}
                        target={isExternalUrl(href) ? '_blank' : undefined}
                        rel={isExternalUrl(href) ? 'noreferrer' : undefined}
                        className="text-accent underline underline-offset-2 break-all"
                    >
                        {renderInlineMarkdown(label, `${key}-label`)}
                    </a>
                ) : (
                    token.match
                ),
            );
        } else if (token.type === 'bold') {
            const boldContent = token.groups[0] ?? token.groups[1] ?? '';
            nodes.push(
                <strong key={key} className="font-semibold">
                    {renderInlineMarkdown(boldContent, `${key}-bold`)}
                </strong>,
            );
        } else if (token.type === 'strike') {
            nodes.push(
                <del key={key} className="opacity-80">
                    {renderInlineMarkdown(token.groups[0] ?? '', `${key}-strike`)}
                </del>,
            );
        } else if (token.type === 'italic') {
            const italicContent = token.groups[0] ?? token.groups[1] ?? '';
            nodes.push(
                <em key={key} className="italic">
                    {renderInlineMarkdown(italicContent, `${key}-italic`)}
                </em>,
            );
        } else if (token.type === 'autolink') {
            const href = sanitizeUrl(token.groups[0]);

            nodes.push(
                href ? (
                    <a
                        key={key}
                        href={href}
                        target={isExternalUrl(href) ? '_blank' : undefined}
                        rel={isExternalUrl(href) ? 'noreferrer' : undefined}
                        className="text-accent underline underline-offset-2 break-all"
                    >
                        {token.groups[0]}
                    </a>
                ) : (
                    token.match
                ),
            );
        }

        remainingText = remainingText.slice(token.index + token.match.length);
        tokenIndex += 1;
    }

    return nodes;
}

function renderBlocks(blocks: ContentBlock[], keyPrefix = 'block') {
    return blocks.map((block, blockIndex) => {
        const key = `${keyPrefix}-${blockIndex}`;

        if (block.type === 'heading') {
            const HeadingTag = `h${block.level}` as const;

            return (
                <HeadingTag key={key} className={HEADING_STYLES[block.level]}>
                    {renderInlineMarkdown(block.text, `${key}-heading`)}
                </HeadingTag>
            );
        }

        if (block.type === 'paragraph') {
            return (
                <p key={key} className="whitespace-pre-wrap break-words leading-6">
                    {renderInlineMarkdown(block.text, `${key}-paragraph`)}
                </p>
            );
        }

        if (block.type === 'list') {
            const ListTag = block.ordered ? 'ol' : 'ul';

            return (
                <ListTag
                    key={key}
                    start={block.ordered ? block.start : undefined}
                    className={
                        block.ordered
                            ? 'list-decimal space-y-2 pl-5 leading-6 marker:text-ink-dim'
                            : 'list-disc space-y-2 pl-5 leading-6 marker:text-ink-dim'
                    }
                >
                    {block.items.map((item, itemIndex) => (
                        <li key={`${key}-item-${itemIndex}`} className="whitespace-pre-wrap">
                            {renderInlineMarkdown(item, `${key}-item-${itemIndex}`)}
                        </li>
                    ))}
                </ListTag>
            );
        }

        if (block.type === 'quote') {
            return (
                <blockquote
                    key={key}
                    className="border-l-2 border-stroke-soft pl-4 text-ink-dim"
                >
                    <div className="space-y-3">
                        {renderBlocks(block.blocks, `${key}-quote`)}
                    </div>
                </blockquote>
            );
        }

        if (block.type === 'code') {
            return (
                <div
                    key={key}
                    className="overflow-hidden rounded-card border border-stroke-soft bg-panel-soft"
                >
                    {block.language ? (
                        <div className="border-b border-stroke-soft px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-dim">
                            {block.language}
                        </div>
                    ) : null}
                    <pre className="overflow-x-auto p-3 text-[12px] leading-6 text-ink sm:text-[13px]">
                        <code>{block.code}</code>
                    </pre>
                </div>
            );
        }

        if (block.type === 'rule') {
            return <hr key={key} className="border-stroke-soft" />;
        }

        return (
            <div
                key={key}
                className="overflow-x-auto rounded-card border border-stroke-soft"
            >
                <table className="min-w-full border-collapse text-left text-[12px] sm:text-[13px]">
                    <thead className="bg-panel-soft text-ink">
                        <tr>
                            {block.headers.map((header, headerIndex) => {
                                const nonWrappingColumn = shouldPreventWrap(header, header);

                                return (
                                    <th
                                        key={`${key}-header-${headerIndex}`}
                                        className={
                                            nonWrappingColumn
                                                ? 'px-3 py-2.5 font-semibold whitespace-nowrap break-normal'
                                                : 'px-3 py-2.5 font-semibold whitespace-nowrap'
                                        }
                                    >
                                        {renderInlineMarkdown(
                                            header,
                                            `${key}-header-${headerIndex}`,
                                        )}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {block.rows.map((row, rowIndex) => (
                            <tr
                                key={`${key}-row-${rowIndex}`}
                                className="border-t border-stroke-soft"
                            >
                                {row.map((cell, cellIndex) => {
                                    const header = block.headers[cellIndex] ?? '';
                                    const nonWrappingColumn = shouldPreventWrap(header, cell);

                                    return (
                                        <td
                                            key={`${key}-cell-${rowIndex}-${cellIndex}`}
                                            className={
                                                nonWrappingColumn
                                                    ? 'px-3 py-2.5 align-top whitespace-nowrap break-normal'
                                                    : 'px-3 py-2.5 align-top whitespace-pre-wrap break-normal'
                                            }
                                        >
                                            {cell ? (
                                                renderInlineMarkdown(
                                                    cell,
                                                    `${key}-cell-${rowIndex}-${cellIndex}`,
                                                )
                                            ) : (
                                                <span className="text-ink-dim">&nbsp;</span>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    });
}

export function MessageContent({ content }: MessageContentProps) {
    const blocks = parseContentBlocks(content);

    return <div className="space-y-4">{renderBlocks(blocks)}</div>;
}
