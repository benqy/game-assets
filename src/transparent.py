import os
from PIL import Image

def remove_white_background(image_path, output_path):
    image = Image.open(image_path)
    image = image.convert("RGBA")

    # 获取图片的宽度和高度
    width, height = image.size

    # 创建一个空白的透明底色图片
    transparent_image = Image.new("RGBA", (width, height), (0, 0, 0, 0))

    # 遍历图片的每个像素点
    for x in range(width):
        for y in range(height):
            # 获取当前像素点的RGBA值
            r, g, b, a = image.getpixel((x, y))

            # 判断当前像素点是否为白色
            threshold = 240
            if r >= threshold and g >= threshold and b >= threshold:
                # 设置当前像素点在透明底色图片中的RGBA值
                transparent_image.putpixel((x, y), (r, g, b, 0))
            else:
                # 设置当前像素点在透明底色图片中的RGBA值为原始图片的值
                transparent_image.putpixel((x, y), (r, g, b, a))

    # 保存图片
    transparent_image.save(output_path)
    # transparent_image.save(output_path,format='WEBP')


input_folder = "../temp"  # 替换为包含待处理图像的文件夹路径
output_folder = "../temp1"  # 替换为输出图像的文件夹路径
# 确保输出文件夹存在
os.makedirs(output_folder, exist_ok=True)

for filename in os.listdir(input_folder):
    if filename.endswith((".jpg", ".jpeg", ".png")):
        input_path = os.path.join(input_folder, filename)
        output_file = os.path.join(output_folder, os.path.splitext(filename)[0] + '.png')
        remove_white_background(input_path, output_file)
        print("Processed:", output_file)