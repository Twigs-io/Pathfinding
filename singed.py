import matplotlib.image as mpimg
import matplotlib.pyplot as plt
from PIL import Image

vander1 = Image.open('vander.jpg')
vander2 = mpimg.imread('vander.jpg')

vander1.show()