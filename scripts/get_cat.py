# Dan Girshovich

import sys
import urllib
import json

def get_cat(message):
    message = filter(lambda c : c.isalpha or c == ' ', message)
    api_url = 'https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q='
    query = urllib.quote('lolcat lolcat lolcat ' + message)
    html = urllib.urlopen(api_url + query).read()
    print api_url + query
    d = json.loads(html)
    try:
        return d['responseData']['results'][0]['url']
    except:
        return None

if __name__ == '__main__':
    if len(sys.argv) == 2:
        message = sys.argv[1]
        print get_cat(message)
    else:
        print 'Usage %s <message text>' % sys.argv[0]