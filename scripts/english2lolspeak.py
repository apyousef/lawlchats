# Dan Girshovich
# TODO: convert to javascript if time

import sys
import json

lookup = None
with open('tranzlator.json', 'r') as f:
    lookup = json.loads(f.read())

def to_lolspeak(english_message):
    english_words = english_message.split(' ')
    lolspeak_words = []
    for english_word in english_words:
        valid_letter = lambda s : s.isalpha() or s == '\''
        english_word = filter(valid_letter, english_word)
        was_capitalized = english_word[0].isupper()
        english_word = english_word.lower()
        lolspeak_word = english_word
        if english_word in lookup:
            lolspeak_word = lookup[english_word]
        if was_capitalized:
            lolspeak_word = lolspeak_word[0].upper() + lolspeak_word[1:]
        lolspeak_words.append(lolspeak_word)
    return ' '.join(lolspeak_words)

if __name__ == '__main__':
    if len(sys.argv) == 2:
        english_message = sys.argv[1]
        print to_lolspeak(english_message)
    else:
        print 'Usage: %s <english message>' % sys.argv[0]