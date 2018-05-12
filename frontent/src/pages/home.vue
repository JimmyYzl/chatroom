<template>
<div class="home">
    <el-row>
        <el-col :xs="24" :sm="{span: 12, offset: 5}" class="msgbox" :style="{height: winHei + 'px'}">
            <div class="msgbox-title">
                <div class="msgbox-alt">
                    请输入用户名
                </div>
                <input type="text" class="userinput" v-model="username" @keyup.enter="submitFn" @input="clearerr">
                <div class="errmag" v-if="errmsg">{{errmsg}}</div>
            </div>
        </el-col>
    </el-row>
</div>
</template>

<script>
    import Api from '@/api/index.js';
    export default {
        data () {
            return {
                username: null,
                winHei: null,
                errmsg: null
            }
        },

        created () {
            this.winHei = window.innerHeight;
        },

        methods: {
            submitFn () {
                Api.login({"username": this.username}, (result) => {
                    var data = result.data;
                    if(data.code != 0) {
                        this.errmsg = data.data;
                    } else {
                        localStorage.setItem('yzlcode', data.data);
                        this.$routes.push('/room');
                    }
                })
            },

            clearerr () {
                this.errmsg = null;
            }
        }

    }
</script>

<style scoped lang="scss">
    .home{
        width: 100%;
        .msgbox{
            background: #000;
            display: flex;
            align-items: center;
            .msgbox-title{
                width: 100%;
                height: 130px;
                padding: 10px 0;
                margin-top: -100px;
                .msgbox-alt {
                    height: 30px;
                    line-height: 30px;
                    width: 100%;
                    font-size: 24px;
                    color: #fff;
                    font-weight: bolder;
                    text-align: center;
                }
                .userinput{
                    margin: 0 auto;
                    font-size: 30px;
                    display: block;
                    height: 50px;
                    width: 200px;
                    border-width: 0;
                    background: transparent;
                    color: #ccc;
                    border-bottom: 1px solid #fff;
                    text-align: center;
                    &:focus{
                        outline: 0;
                    }
                }
                .errmag {
                    padding-top: 5px;
                    color: #d00;
                    font-size: 24px;
                    height: 30px;
                    text-align: center;
                }
            }
        }
    }
</style>
