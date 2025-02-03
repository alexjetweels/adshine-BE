import { Logger } from '@nestjs/common';
import { Config } from '@prisma/client';
import axios, { AxiosError } from 'axios';
import bcrypt from 'bcryptjs';
import config from '../../assets/config.json';
import { ConfigValueType } from './enum';

/**
 * generate hash from password or string
 * @param {string} password
 * @returns {string}
 */
export function generateHash(password: string): string {
  return bcrypt.hashSync(password, 10);
}

/**
 * validate text with hash
 * @param {string} password
 * @param {string} hash
 * @returns {Promise<boolean>}
 */
export function validateHash(
  password: string | undefined,
  hash: string | undefined | null,
): Promise<boolean> {
  if (!password || !hash) {
    return Promise.resolve(false);
  }

  return bcrypt.compare(password, hash);
}

/**
 *
 * @param getVar
 * @returns
 */
export function getVariableName<TResult>(
  getVar: () => TResult,
): string | undefined {
  const m = /\(\)=>(.*)/.exec(
    getVar.toString().replace(/(\r\n|\n|\r|\s)/gm, ''),
  );

  if (!m) {
    throw new Error(
      "The function does not contain a statement matching 'return variableName;'",
    );
  }

  const fullMemberName = m[1];

  const memberParts = fullMemberName.split('.');

  return memberParts.at(-1);
}

export async function fetchImageUrl(imageUrl: string) {
  try {
    const response = await axios(imageUrl, { responseType: 'arraybuffer' });
    return Buffer.from(response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error && error.response) {
        Logger.error(
          `Error fetch image from URL: ${imageUrl} | Error Msg: ${error.response.statusText}`,
        );
        throw new Error(`Error fetch image URL: ${imageUrl}`);
      }
    }
    throw error;
  }
}

export async function fetchImageUrlToBase64(imageUrl: string): Promise<string> {
  const buffer = await fetchImageUrl(imageUrl);
  const base64Image = buffer.toString('base64');
  return base64Image;
}

export function levelOfMineTools(level: number) {
  if (level <= 0 || level > 20) {
    throw new Error('Invalid level.');
  }

  let baseLevel = 1;
  let baseCoinPerTap = 1;
  let baseUpgradePrice = 0;
  let baseUnit = 'coin';

  while (baseLevel < level && level >= 2) {
    const preBaseCoinPerTap = baseCoinPerTap;
    baseCoinPerTap = baseCoinPerTap + 1;
    baseLevel += 1;

    if (baseLevel === 2) {
      baseUpgradePrice = 5000;
      continue;
    }

    baseUpgradePrice = (baseCoinPerTap / preBaseCoinPerTap) * baseUpgradePrice;
  }

  const starLevel = [10, 14, 19];
  const starPrice = [20, 30, 50];

  if (starLevel.includes(level)) {
    baseUnit = 'star';
    baseUpgradePrice = starPrice[starLevel.indexOf(level)];
  }

  return {
    level,
    coinPerTap: Math.round(baseCoinPerTap),
    upgradePrice: Math.round(baseUpgradePrice),
    unit: baseUnit,
  };
}

export function levelOfEnergyTank(level: number) {
  if (level <= 0 || level > 50) {
    throw new Error('Invalid level.');
  }

  let baseLevel = 1;
  let baseCapacity = 500;
  let baseUpgradePrice = 0;
  let baseUnit = 'coin';
  const additionPart = 0.05;

  while (baseLevel < level && level >= 2) {
    const preCapacity = baseCapacity;

    baseCapacity = baseCapacity * (1 + additionPart);

    baseLevel += 1;

    if (baseLevel === 2) {
      baseUpgradePrice = 5000;
      continue;
    }

    baseUpgradePrice = (baseCapacity / preCapacity) * baseUpgradePrice;
  }

  const starLevel = [10, 14, 19];
  const starPrice = [20, 30, 50];

  if (starLevel.includes(level)) {
    baseUnit = 'star';
    baseUpgradePrice = starPrice[starLevel.indexOf(level)];
  }

  return {
    level,
    capacity: baseCapacity,
    upgradePrice: Math.round(baseUpgradePrice),
    unit: baseUnit,
  };
}

export function levelOfEnergyRecovery(level: number) {
  if (level <= 0 || level > 50) {
    throw new Error('Invalid level.');
  }

  let baseLevel = 1;
  let baseRecovery = 1;
  let baseUpgradePrice = 0;
  let baseUnit = 'coin';

  while (baseLevel < level && level >= 2) {
    const preRecovery = baseRecovery;
    baseRecovery = baseRecovery + 1;
    baseLevel += 1;

    if (baseLevel === 2) {
      baseUpgradePrice = 5000;
      continue;
    }

    baseUpgradePrice = (baseRecovery / preRecovery) * baseUpgradePrice;
  }

  const starLevel = [5, 10, 15, 20, 25, 30, 35, 40, 43, 45, 48, 50];
  const starPrice = [5, 20, 30, 50, 75, 10, 12, 17, 20, 25, 27, 30];

  if (starLevel.includes(level)) {
    baseUnit = 'star';
    baseUpgradePrice = starPrice[starLevel.indexOf(level)];
  }

  return {
    level,
    recovery: baseRecovery,
    upgradePrice: Math.round(baseUpgradePrice),
    unit: baseUnit,
  };
}

export function levelOfUser(level: number): {
  level: number;
  name: string;
  coins: number;
  bonusToInviter: number;
  percent: number;
} {
  const levelData = JSON.parse(JSON.stringify(config.levels[level]));
  return levelData;
}

export function getRandomPoint(
  excludeArray: number[],
  start = 2,
  end = 12,
): number {
  let randomNumber;
  do {
    randomNumber = Math.floor(Math.random() * (end - start + 1)) + start;
  } while (excludeArray.includes(randomNumber));
  return randomNumber;
}

type OutputItem = {
  [key: string]: {
    key: string;
    valueType: ConfigValueType;
    value: string | number | boolean;
    createdAt: Date;
    updatedAt: Date;
  };
};

export function convertDataConfigs(input: Config[]): OutputItem {
  return input.reduce((acc, cur) => {
    let convertedValue: string | number | boolean = cur.value;
    const valueType = cur.valueType as ConfigValueType;
    if (valueType === 'NUMBER') {
      convertedValue = parseFloat(cur.value);
    } else if (valueType === 'BOOLEAN') {
      convertedValue = cur.value === 'TRUE';
    }
    acc[cur.key] = {
      ...cur,
      value: convertedValue,
      valueType,
    };
    return acc;
  }, {} as OutputItem);
}

export function hideImportantInformation(data: any, keys: string[]) {
  const result = JSON.parse(JSON.stringify(data));
  keys.forEach((key) => {
    if (result.hasOwnProperty(key)) {
      // result[key] = result[key].replaceAll(/./g, '*');
      result[key] = '************************';
    }
  });

  return result;
}
export function schemaPaging({
  page,
  limit,
  data,
  totalPage,
  totalItems,
}: {
  page: number;
  limit: number;
  data: any[];
  totalPage: number;
  totalItems: number;
}) {
  return {
    page,
    limit,
    data,
    totalPage,
    totalItems,
  };
}

export function randomPassword(length = 6): string {
  const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  const allChars = upperCase + lowerCase + numbers + specialChars;

  let password = '';
  password += upperCase[Math.floor(Math.random() * upperCase.length)];
  password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += specialChars[Math.floor(Math.random() * specialChars.length)];

  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  return password
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
}
