# Dan Girshovich

import sys
import json
import re

def remove_quotes(s):
    if s[0] == '"' and s[-1] =='"':
        s = s[1:-1]
    return s

def convert(raw):
    lines = raw.split('\n')
    lookup = {}
    for line in lines:
        line = line.strip()
        if line.count(':') != 1:
            raise Exception('Invalid raw file: Must have <english>:<lolspeak> on each line.')
        english, lolspeak = line.split(':')
        english, lolspeak = remove_quotes(english), remove_quotes(lolspeak)
        lookup[english] = lolspeak
    return json.dumps(lookup)

if __name__ == '__main__':
    if len(sys.argv) == 2:
        fname = sys.argv[1]
        js = ''
        with open(fname, 'r') as f:
            js = convert(f.read())
        output_fname = fname[:fname.find('.raw')] + '.json'
        with open(output_fname, 'w') as f:
            f.write(js)
    else:
        print 'Usage: %s <raw file name>' % sys.argv[0]