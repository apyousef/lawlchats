# Dan Girshovich

import sys
import urllib
import json
import re

def add_capshun(img_url, message, generatorID, imageID):
    message = urllib.quote(message)
    url = 'http://version1.api.memegenerator.net/Instance_Create?username=lolchatz&'\
            'password=icanhazurl&languageCode=en&generatorID=%s&imageID=%s&text0=%s'\
            % (generatorID, imageID, message) 
    html = urllib.urlopen(url).read()
    d = json.loads(html)
    try:
        return d['result']['instanceImageUrl']
    except Exception as e:
        #raise e
        return None    

def get_meme(query, message):
    query = filter(lambda c : c.isalpha(), query)
    query = urllib.quote(query)
    url = 'http://version1.api.memegenerator.net/Generators_Search?q='\
            '%s&pageIndex=0&pageSize=1' % query
    print url
    html = urllib.urlopen(url).read()
    d = json.loads(html)
    print d
    try:
        img_url = d['result'][0]['imageUrl']
        generatorID = d['result'][0]['generatorID']
        imageID = re.search('\d+(?=\.jpg)', img_url).group(0)
        print 'hi'
        return add_capshun(img_url, message, generatorID, imageID)
    except Exception as e:
        #raise e
        return None

if __name__ == '__main__':
    if len(sys.argv) == 2:
        message = sys.argv[1]
        retval = None
        words = sorted(message.split(' '), cmp = lambda w1, w2 : cmp(len(w1), len(w2)))
        query = message
        for word in words:
            if len(word) < 2:
                break
            m = get_meme(query, message)
            if m:
                retval = m
                break
            query = query.replace(word, '')
        print retval
    else:
        print 'Usage %s <message text>' % sys.argv[0]
