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

    highp vec4 color       = subpassLoad(in_color).rgba;
    
    int blue_step = int(color.b * 16.0);

    highp vec2 uv = vec2(float(blue_step) *  1.0 / 16.0 + 1.0 / 16.0 * color.g, color.r);

    highp vec4 grad_color = vec4(texture(color_grading_lut_texture_sampler, uv).xyz, color.a);
       

    out_color = grad_color;
}
