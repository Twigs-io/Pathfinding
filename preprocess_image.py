from PIL import Image
import numpy as np
import cv2

ucsb = Image.open('ucsb.png')
ucsb_array = np.array(ucsb)

def standardize_color(array, color, tolerance):  
    upper = np.array(color) + np.array(tolerance)
    lower = np.array(color) - np.array(tolerance)
    
    condition = np.all((array >= lower) & (array <= upper), axis=-1)
    array[condition] = color

def standardize_white(array, color, tolerance):
    upper = np.array(color) + np.array(tolerance)
    lower = np.array(color) - np.array(tolerance)
    
    condition = np.all((array >= lower) & (array <= upper), axis=-1)
    condition = condition & all(abs(color[i] - color[j]) <= 10 for i in range(3) for j in range(i+1, 3))
    array[condition] = color

green = [135,164,108,255]
white = [255,255,255,255]
blue = [156,192,250,255]
darkgray = [89,89,89,255]
lightgray = [170,162,160,255]
navy = [80,122,177,255]
brown = [135,105,56,255]
colors = [green, white, blue, darkgray, lightgray, navy, brown]

standardize_color(ucsb_array, green, [24,24,24,0])
standardize_white(ucsb_array, white, [80,80,80,0]) 
standardize_color(ucsb_array, blue, [20,20,20,0]) 
standardize_color(ucsb_array, darkgray, [20,20,20,0]) 
standardize_color(ucsb_array, lightgray, [20,20,20,0]) 
standardize_color(ucsb_array, navy, [30,30,30,0]) 
standardize_color(ucsb_array, brown, [20,20,20,0])

def color_swap(array, color, final_color):
    temp = np.all(array == color, axis=-1)
    array[temp] = final_color

# two color
color_swap(ucsb_array, lightgray, [0,0,0,255])
color_swap(ucsb_array, navy, [0,0,0,255])

mask = np.zeros(ucsb_array.shape[:-1], dtype=bool)
for color in colors:
    mask = mask | np.all(ucsb_array == color, axis=-1)
ucsb_array[~mask] = [0, 0, 0, 255]

image = Image.fromarray(ucsb_array)
image.save("bw.png")

rgb_image = ucsb_array[:, :, :3]  # Extract RGB channels
alpha_channel = ucsb_array[:, :, 3]  # Extract the alpha channel

# Apply Gaussian Blur to the RGB channels
filtered_rgb = cv2.medianBlur(rgb_image, 7)

# Recombine the blurred RGB with the original alpha channel
filtered_ucsb = np.dstack((filtered_rgb, alpha_channel))

final = Image.fromarray(filtered_ucsb)
new_size = (final.width // 2, final.height // 2)
final = final.resize(new_size)
final.save("finalmap.png")