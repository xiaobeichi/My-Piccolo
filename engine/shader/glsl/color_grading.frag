#version 310 es

#extension GL_GOOGLE_include_directive : enable

#include "constants.h"

layout(input_attachment_index = 0, set = 0, binding = 0) uniform highp subpassInput in_color;

layout(set = 0, binding = 1) uniform sampler2D color_grading_lut_texture_sampler;

layout(location = 0) out highp vec4 out_color;

void main()
{
    highp ivec2 lut_tex_size = textureSize(color_grading_lut_texture_sampler, 0);
    highp float _COLORS      = float(lut_tex_size.y);

    highp vec4 color       = subpassLoad(in_color).rgba; //原图像的颜色0~1

    highp vec2 lutSize = vec2(lut_tex_size.x, lut_tex_size.y);

    highp float blockNum = lutSize.x / lutSize.y; //多少个b块 y是一块的边长，x是n块的边长

    highp float blockIndexL = floor(color.b * blockNum);//对应到哪两个b块的插值
    highp float blockIndexR = ceil(color.b * blockNum);
    //在两个块里分别对应的x坐标（r对应的映射）
    highp float lutCoordXL = (blockIndexL * lutSize.y + color.r * lutSize.y) / lutSize.x;
    highp float lutCoordXR = (blockIndexR * lutSize.y + color.r * lutSize.y) / lutSize.x;

    highp float lutCoorY = color.g; //两个块对应的y坐标一致

    highp vec2 lutCoordL = vec2(lutCoordXL, lutCoorY);
    highp vec2 lutCoordR = vec2(lutCoordXR, lutCoorY);

    // 根据对应到的图中的坐标位置进行插值获取两个图中的映射颜色
    highp vec4 lutcolorL = texture(color_grading_lut_texture_sampler, lutCoordL);
    highp vec4 lutcolorR = texture(color_grading_lut_texture_sampler, lutCoordR);

    //获取在y的哪个位置，再获得离两个整数b的index的距离比例
    highp float weight = fract(color.b * lutSize.y);
    //根据比例对两个采样颜色进行插值
    out_color = mix(lutcolorL, lutcolorR, weight);
    
    // texture(color_grading_lut_texture_sampler, uv)

    //out_color = color;
}
