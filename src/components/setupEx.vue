<template>
    <div :class="['input-wrapper']">
        <label :class="floatLabel" :style="labelPositionWidth">{{label}}</label>
        <input
            :class="['my-input',input_cpmputed_class]"
            :value="modelValue"
            @input="emitInput"
            v-bind="$attrs"
            @focus="focusEvent"
            @blur="blurEvent"
            :disabled="disabled"
            ref="inputDOM"
        />
        <div class="input-line"></div>
        <div :class="myFocus"></div>
    </div>
</template>
<script>
import { computed, onMounted, ref} from 'vue';
export default {
    name: "IIInput",
    props: {
        modelValue: {
            type: String,
            default: ''
        },
        //label出现的位置，默认值是left
        labelPosition: {
            type: String,
            default: "left",
        }, 

        //当label出现在左侧时，传入宽度
        labelWidth: {
            type: String,
            default: "100px",
        },
        
        //禁用属性
        disabled: {
            type: Boolean,
            default: false
        }
    },
    // mounted() {
    //     console.log('this:',this);
    // },
    setup(props,context) {
        //data
        const label = ref('')
        const isFocus = ref(false) ;
        const inputDOM = ref(null);
        console.log('_ctx',context);
        //mounted
        onMounted(() => {
            label.value = context.attrs.placeholder + ":";
            console.log('_ctx2',context);
        });

        //computed
        let myFocus = computed(() => {
            return {
                "line-focus": true,
                focus: isFocus.value,
            }
        });
        let floatLabel = computed(() => {
                return {
                    "init-status": true,
                    "show-status-top": props.labelPosition == "top" && isFocus.value,
            };
        });
        let labelPositionWidth = computed(() => {
            if (props.labelPosition == "left" && isFocus.value) {
                return `left:-${props.labelWidth};opacity: 1`;
            } else {
                return "";
            }
        });
        let input_cpmputed_class = computed(() => {
            return {
                "disabled": props.disabled
            }
        });

        //metheds
        const focusEvent = (e) => {
            inputDOM.value.placeholder = "";
            isFocus.value = true;
        };
        const blurEvent = (e) => {
            //动画完毕，placehoder出现
            if (!e.target.value) {
                setTimeout(() => {
                    inputDOM.value.placeholder = label.value;
                }, 250);
                isFocus.value = false;
            }
        };
        const emitInput = (e) => {
            context.emit('update:modelValue',e.target.value)
            // context.emit("input", e.target.value);
        };
        return {
            label,
            myFocus,
            floatLabel,
            labelPositionWidth,
            input_cpmputed_class,
            focusEvent,
            blurEvent,
            emitInput,
            inputDOM
        }
    }
}
</script>
<style lang="stylus" scoped>
.disabled
  background-color:#F5F7FA!important
  &:hover
    cursor:not-allowed
.input-wrapper
  width: 100%
  position: relative
  .line-focus.focus
    transform: scaleX(1)
  .line-focus
    position: absolute
    bottom: -1px
    height: 2px
    width: 100%
    background-color: #2196f3
    transform: scaleX(0)
    transition-property: transform
    transition-duration: 0.3s
    transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1)
    transition-delay: 0s
  .input-line
    position: absolute
    bottom: -1px
    height: 1px
    width: 100%
    background-color: rgba(0, 0, 0, 0.12)
  .my-input
    width: 100%
    height: 32px
    line-height: 32px
    border: none
    outline: none
    background: none
  .init-status
    position: absolute
    top: 5px
    left: 2px
    bottom: 5px
    opacity: 0
    transition: all 0.3s ease-out
  .show-status-top
    top: -16px
    opacity: 1
</style>