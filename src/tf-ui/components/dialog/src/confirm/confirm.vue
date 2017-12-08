<template>
    <div class="mask-black-dialog">
        <div :class="classFormater">
            <div v-if="icon != ''" class="m-confirm-icon">
                <tf-icon class="iconcust" :name="iconName" size="1.6rem"></tf-icon>
            </div>
            <div class="confirm-hd">
                <strong class="confirm-title" v-html="title"></strong>
            </div>
            <div class="confirm-bd" v-html="mes"></div>
            <template v-if="typeof opts == 'function'">
                <div class="confirm-ft">
                    <a href="javascript:;" class="confirm-btn default" @click.stop="closeConfirm(false)">取消</a>
                    <a href="javascript:;" class="confirm-btn primary" @click.stop="closeConfirm(false, opts)">确定</a>
                </div>
            </template>
            <template v-else>
                <div class="confirm-ft">
                    <a href="javascript:;" class="confirm-btn" v-for="item in opts" :class="typeof item.color == 'boolean' ? (item.color ? 'primary' : 'default') : ''" :style="{color: item.color}" @click.stop="closeConfirm(item.stay, item.callback)">{{item.txt}}</a>
                </div>
            </template>
        </div>
    </div>
</template>
<style lang="less">
.m-confirm.has-icon {
    overflow: hidden;
    .m-confirm-icon {
        text-align: center;
        padding-top: .12rem;
        position: relative;
        margin-bottom: -.14rem;
    }
    .confirm-hd {
        padding-top: 0px;
        .confirm-title {
            font-size: .3rem;
            color: #444;
        }
    }
    .confirm-bd {
        text-align: center;
        font-size: .24rem;
        line-height: .3rem;
        color: #bbb;
        padding:6px .2rem 8px .2rem;
        position: relative;
        margin-top: -5px;
    }
}
@warnColor:#ffd332;
@successColor:#3ccd94;
.m-confirm.has-icon.has-icon-warn {
    .icon-warn {
        /*color: @warnColor;*/
        background-image: -webkit-gradient(linear, 0 0, right bottom, from(rgba(255, 210, 50, 1)), to(rgba(255, 210, 20, .5)));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    .confirm-btn.primary {
        background-color: #f01924;
        color: #fff;
    }
}

.m-confirm.has-icon.has-icon-wancheng {
    .icon-wancheng {
        /*color: @warnColor;*/
        background-image: -webkit-gradient(linear,left top,left bottom,from(#4feabe),to(#42e5e9));
        background-image: linear-gradient(180deg,#4feabe,#42e5e9);
        /*-webkit-box-shadow: 0 0.02rem 0.25rem rgba(66,229,233,.4);
        box-shadow: 0 0.02rem 0.25rem rgba(66,229,233,.4);*/
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    .confirm-btn.primary {
        /*background-image: -webkit-gradient(linear,left top,right bottom,from(#4feabe),to(#42e5e9));
        background-image: linear-gradient(135deg,#4feabe,#42e5e9);*/
        background-image: -webkit-gradient(linear,left top,left bottom,from(#fff),to(#f6f6f6));
        background-image: linear-gradient(180deg,#fff,#f6f6f6);
        color: #808080;
        border-radius: .8rem;
        border: 1px solid #e1e1e1;
        -webkit-box-shadow: 0 4px 20px rgba(0,0,0,.06);
        box-shadow: 0 4px 20px rgba(0,0,0,.06);
    }
}

.m-confirm.has-icon.has-icon-success {
    .icon-success {
        color: @successColor;
    }
    .confirm-btn.primary {
        background-color: @successColor;
        color: #fff;
    }
}
</style>

<script type="text/babel">

import { Icons } from './../../../icons';
export default {
    components: {
        [Icons.name]: Icons
    },
    props: {
        title: String,
        mes: String,
        icon: {
            type: String,
            default: ""
        },
        opts: {
            type: [Array, Function],
            default: () => {
            }
        }
    },
    computed: {
        iconName() {
            return this.icon
        },
        classFormater() {
            var classObj = {
                "m-confirm": true,
                "has-icon": false
            }
            if (this.icon) {
                classObj["has-icon"] = true;
                classObj["has-icon-" + this.icon] = true;
            }

            return classObj;
        }
    }
}
</script>
