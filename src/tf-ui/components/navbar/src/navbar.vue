<template>
    <!-- <header class="m-navbar navbar-bottom-line-color" :class="classes" :style="{backgroundColor: bgcolor, height: height}"> -->
    <header class="m-navbar navbar-bottom-line-color app-header" :class="classes" :style="{height: height}">
        <div class="navbar-item">
            <slot name="left"></slot>
        </div>
        <div class="navbar-center-box" :style="{height: height}">
            <div class="navbar-center">
                <slot name="center"><span class="center-title" :style="{color: color, fontSize: fontsize}">{{title}}</span></slot>
            </div>
        </div>
        <div class="navbar-item">
            <slot name="right"></slot>
        </div>
    </header>
</template>

<script type="text/babel">
    import {isColor} from '../../../utils/assist';

    export default {
        name: 'tf-navbar',
        props: {
            title: String,
            fixed: Boolean,
            bgcolor: {
                validator(value) {
                    if(!value) return true;
                    return isColor(value);
                },
                default: '#F01823'
            },
            color: {
                validator(value) {
                    if(!value) return true;
                    return isColor(value);
                },
                default: '#FFFFFD'
            },
            fontsize: {
                validator(value) {
                    return /^(\.|\d+\.)?\d+(px|rem)$/.test(value);
                },
                default: '.4rem'
            },
            height: {
                validator(value) {
                    return /^(\.|\d+\.)?\d+(px|rem)$/.test(value);
                },
                default: '.88rem'
            }
        },
        computed: {
            classes() {
                return this.fixed ? 'navbar-fixed' : '';
            }
        }
    }
</script>

<style lang="less">
    @import '../../../styles/components/navbar.less';
</style>
