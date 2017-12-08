<template>
    <svg class="symbol-icon" :style="styles" aria-hidden="true">
        <use :xlink:href="iconName"></use>
    </svg>
</template>
<script>
import svgIcon from "@/assets/tbbanksymbol/iconfont"
export default {
    name: 'tf-symbol',
    props: {
        name:{
            type:String,
            default:""
        },
        size: {
            validator(value) {
                return /^(\.|\d+\.)?\d+(px|rem)$/.test(value);
            },
            default: '.6rem'
        }
    },
    computed: {
        iconName(){
            return "#icon-" +this.name;
        },
        styles() {
            const style = {};

            if (!!this.size) {
                style.fontSize = this.size;
                style.width = this.size;
                style.height=this.size;
            }

            return style;
        }
    }
}
</script>

<style lang="less">
.symbol-icon {
    /* 通过设置 font-size 来改变图标大小 */
    width: 1rem;
    height: 1rem;
    /* 图标和文字相邻时，垂直对齐 */
    // vertical-align: -0.15em;
    /* 通过设置 color 来改变 SVG 的颜色/fill */
    fill: currentColor;
    /* path 和 stroke 溢出 viewBox 部分在 IE 下会显示
             normalize.css 中也包含这行 */
    overflow: hidden;
}
</style>



