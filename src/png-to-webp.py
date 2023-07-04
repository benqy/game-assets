import os
from PIL import Image

def convert_images(source_dir, destination_dir):
    # 创建目标目录
    if not os.path.exists(destination_dir):
        os.makedirs(destination_dir)

    # 遍历源目录中的所有文件
    for file_name in os.listdir(source_dir):
        file_path = os.path.join(source_dir, file_name)

        # 检查文件是否是PNG图像
        # if os.path.isfile(file_path) and file_name.lower().endswith('.png'):
            # 打开图像文件
        image = Image.open(file_path)

        # 调整图像大小为400x400像素的正方形
        resized_image = image.resize((400, 400))
        
        # 构造目标文件路径
        destination_file_path = os.path.join(destination_dir, f'{os.path.splitext(file_name)[0]}.webp')

        # 保存图像为WebP格式
        resized_image.save(destination_file_path, 'WEBP')

        print(f'Converted {file_name} to {os.path.basename(destination_file_path)}')

    print('Conversion complete.')

# 用法示例
input_folder = "../temp1"  # 替换为包含待处理图像的文件夹路径
output_folder = "../assets/enemy"  # 替换为输出图像的文件夹路径

convert_images(input_folder, output_folder)
