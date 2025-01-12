from PIL import Image
import numpy as np

ucsb_array = np.load("ucsb_array.npy")
final = Image.fromarray(ucsb_array[:-300, 1200:-1500])
new_size = (final.width // 4, final.height // 4)
final = final.resize(new_size)
final.save("bigbones.png")

ucsb_array=np.array(final)
np.save("ucsb_array2.npy", ucsb_array)