import os
from PIL import Image,ImageChops

def detect_content(image_path):
    # 打开图像
    image = Image.open(image_path)

    # 转换为RGB模式（如果不是）
    image = image.convert("RGB")

    # 获取图像尺寸
    width, height = image.size

    # 创建一个与图像尺寸相同的白色图像
    white_image = Image.new("RGB", (width, height), "white")

    # 计算图像像素之间的差异
    diff = ImageChops.difference(image, white_image)

    # 将差异图像转换为灰度模式
    diff = diff.convert("L")

    # 设置阈值进行二值化
    threshold = 10
    diff = diff.point(lambda p: 255 if p > threshold else 0)

    # 查找内容区域的边界框
    bbox = diff.getbbox()

    # 如果没有找到边界框，则返回整个图像的尺寸
    if not bbox:
        bbox = (0, 0, width, height)

    return bbox
def save_content(image_path, bbox, output_path):
    image = Image.open(image_path)

    # 裁剪图像为内容区域
    content_image = image.crop(bbox)
    # 调整内容区域为正方形，透明填充多余区域
    # size = max(content_image.size)
    # square_image = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    # position = ((size - content_image.size[0]) // 2, (size - content_image.size[1]) // 2)
    # square_image.paste(content_image, position)
    # 调整内容区域为正方形，白色填充多余区域
    size = max(content_image.size)
    square_image = Image.new("RGB", (size, size), "white")
    position = ((size - content_image.size[0]) // 2, (size - content_image.size[1]) // 2)
    square_image.paste(content_image, position)
    # 保存内容区域图像
    square_image.save(output_path)

input_folder = "../download"  # 替换为包含待处理图像的文件夹路径
output_folder = "../temp"  # 替换为输出图像的文件夹路径
# 确保输出文件夹存在
os.makedirs(output_folder, exist_ok=True)

# 使用示例
# image_path = "76.jpg"  # 替换为实际的图像路径
# output_path = "content_image.png"  # 替换为输出图像的路径
# content_bbox = detect_content(image_path)
# save_content(image_path, content_bbox, output_path)


# 遍历输入文件夹中的图像文件
for filename in os.listdir(input_folder):
    if filename.endswith((".jpg", ".jpeg", ".png")):
        # 构建输入和输出文件的完整路径
        input_path = os.path.join(input_folder, filename)
        output_path = os.path.join(output_folder, filename)

        # 检测内容区域
        content_bbox = detect_content(input_path)

        # 保存内容区域图像
        save_content(input_path, content_bbox, output_path)

        print("Processed:", input_path)

print("Batch processing completed.")
