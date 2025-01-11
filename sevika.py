import random

def sevika():
    for a in range(10):
        for b in range(10):
            for c in range(10):
                for d in range(10):
                    for e in range(10):
                        for f in range(10):
                            print("sevika", a, b, c, d, e, f)
                            i = random.randint(0,999999)
                            if i == 100000*a+10000*b+1000*c+100*d+10*e+f: 
                                return("you won ", a,b,c,d,e,f, "prancoins")
    return("you won 0 prancoins :(")

sevika()

