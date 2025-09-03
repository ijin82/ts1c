'use strict';

import makeOrdinal from './makeOrdinal'
import isFinite from './isFinite'
import isSafeNumber from './isSafeNumber'

const TEN: number = 10;
const ONE_HUNDRED: number = 100;
const ONE_THOUSAND: number = 1000;
const ONE_MILLION: number = 1000000;
const ONE_BILLION: number = 1000000000;           //         1.000.000.000 (9)
const ONE_TRILLION: number = 1000000000000;       //     1.000.000.000.000 (12)
const ONE_QUADRILLION: number = 1000000000000000; // 1.000.000.000.000.000 (15)
const MAX: number = 9007199254740992;             // 9.007.199.254.740.992 (15)

const LESS_THAN_TWENTY: string[] = [
    'zero','one','two','three','four',
    'five','six','seven','eight','nine',
    'ten','eleven','twelve','thirteen','fourteen',
    'fifteen','sixteen','seventeen','eighteen','nineteen',
];

const TENTHS_LESS_THAN_HUNDRED: string[] = [
    'zero', 'ten', 'twenty', 'thirty', 'forty', 
    'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
];

/**
 * Converts an integer into words.
 * If number is decimal, the decimals will be removed.
 * @example toWords(12) => 'twelve'
 * @param {number|string} number
 * @param {boolean} [asOrdinal] - Deprecated, use toWordsOrdinal() instead!
 * @returns {string}
 */
const toWordsPre = (number1: number | string, asOrdinal: boolean): string => {
    const num: number = parseInt(String(number1), 10);

    if (!isFinite(num)) {
        throw new TypeError(
            'Not a finite number: ' + number1 + ' (' + typeof number1 + ')'
        );
    }
    if (!isSafeNumber(num)) {
        throw new RangeError(
            'Input is not a safe number, it’s either too large or too small.'
        );
    }

    const words = generateWords(num);

    return asOrdinal ? makeOrdinal(words) : words;
}

function generateWords(numberWords: number, words?: string[]) {
    let remainder: number = 0;
    let word: string = '';

    // We're done
    if (numberWords === 0) {
        return !words ? 'zero' : words.join(' ').replace(/,$/, '');
    }
    // First run
    if (!words) {
        words = [];
    }
    // If negative, prepend “minus”
    if (numberWords < 0) {
        words.push('minus');
        numberWords = Math.abs(numberWords);
    }

    if (numberWords < 20) {
        remainder = 0;
        word = LESS_THAN_TWENTY[numberWords];

    } else if (numberWords < ONE_HUNDRED) {
        remainder = numberWords % TEN;
        word = TENTHS_LESS_THAN_HUNDRED[Math.floor(numberWords / TEN)];
        // In case of remainder, we need to handle it here to be able to add the “-”
        if (remainder) {
            word += '-' + LESS_THAN_TWENTY[remainder];
            remainder = 0;
        }

    } else if (numberWords < ONE_THOUSAND) {
        remainder = numberWords % ONE_HUNDRED;
        word = generateWords(Math.floor(numberWords / ONE_HUNDRED)) + ' hundred';

    } else if (numberWords < ONE_MILLION) {
        remainder = numberWords % ONE_THOUSAND;
        word = generateWords(Math.floor(numberWords / ONE_THOUSAND)) + ' thousand,';

    } else if (numberWords < ONE_BILLION) {
        remainder = numberWords % ONE_MILLION;
        word = generateWords(Math.floor(numberWords / ONE_MILLION)) + ' million,';

    } else if (numberWords < ONE_TRILLION) {
        remainder = numberWords % ONE_BILLION;
        word = generateWords(Math.floor(numberWords / ONE_BILLION)) + ' billion,';

    } else if (numberWords < ONE_QUADRILLION) {
        remainder = numberWords % ONE_TRILLION;
        word = generateWords(Math.floor(numberWords / ONE_TRILLION)) + ' trillion,';

    } else if (numberWords <= MAX) {
        remainder = numberWords % ONE_QUADRILLION;
        word = generateWords(Math.floor(numberWords / ONE_QUADRILLION)) +
        ' quadrillion,';
    }

    words.push(word);

    return generateWords(remainder, words);
}

export const toWords = toWordsPre;