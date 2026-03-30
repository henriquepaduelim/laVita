type CsvRow = Record<string, string>;

function splitCsvLine(line: string) {
  const values: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }

      continue;
    }

    if (char === ',' && !inQuotes) {
      values.push(current.trim());
      current = '';
      continue;
    }

    current += char;
  }

  values.push(current.trim());
  return values;
}

export function parseCsv<T>(raw: string, mapRow: (row: CsvRow) => T) {
  const lines = raw
    .trim()
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) {
    return [] as T[];
  }

  const headers = splitCsvLine(lines[0]);

  return lines.slice(1).map((line) => {
    const values = splitCsvLine(line);
    const row = headers.reduce<CsvRow>((accumulator, header, index) => {
      accumulator[header] = values[index] ?? '';
      return accumulator;
    }, {});

    return mapRow(row);
  });
}

export function toNumber(value: string) {
  if (!value) {
    return Number.NaN;
  }

  return Number(value);
}

export function toInteger(value: string) {
  if (!value) {
    return Number.NaN;
  }

  return Number(value.replace(/\./g, '').replace(',', '.'));
}
