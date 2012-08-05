# Dan Girshovich
# TODO: convert to javascript if time

import sys
import json
import re

lookup = None
with open('scripts/tranzlator.json', 'r') as f:
    lookup = json.loads(f.read())

def lolify_word(matchobj):
    english_word = matchobj.group(0)
    if english_word.lower() in lookup:
        lolspeak_word = lookup[english_word.lower()]
        if english_word[0].isupper():
            lolspeak_word = lolspeak_word[0].upper() + lolspeak_word[1:]
        return lolspeak_word
    else:
        return english_word

def to_lolspeak(english_message):
    return re.sub('[a-zA-z\']+', lolify_word, english_message)

if __name__ == '__main__':
    if len(sys.argv) == 2:
        english_message = sys.argv[1]
        print to_lolspeak(english_message)
    else:
        print 'Usage: %s <english message>' % sys.argv[0]
