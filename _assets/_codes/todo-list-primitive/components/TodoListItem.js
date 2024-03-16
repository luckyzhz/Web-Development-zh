export default {
    props: {
        // 设置自定义属性 `todo` 的类型为 Object, 以及要求必填
        todo: {
            type: Object,
            required: true,
        },
    },
    data: function () {
        return {
            editing: false,
        };
    },
    methods: {
        toEditing: function () {
            this.editing = true;
            // 触发 `toEditing` 时, `<input>` 还没加载到 DOM,
            // 所以需要等到下一个渲染周期 `nextTick` 再操作 `<input>`
            this.$nextTick(() => {
                this.$refs.inputField.focus();
            });
        },
        // 用 `this.$refs.ref值` 索引到元素后, 直接操作该元素
        saveText: function () {
            const editedText = this.$refs.inputField.value.trim();
            if (editedText) {
                this.todo.text = editedText;
                this.editing = false;
            }
        },
    },
    template: `
        <li>
            <div v-if="!editing">
                <div>
                    <input type="checkbox" v-model="todo.finished" :id="todo.id" />
                    <label :for="todo.id"> {{ todo.text }} </label>
                </div>
                <div>
                    <button type="button" @click="toEditing">Edit</button>
                    <button type="button" @click="$emit('delete', todo.id)">
                        Delete
                    </button>
                </div>
            </div>
            <!-- 编辑模式下显示输入框和相应按钮 -->
            <div v-else>
                <input type="text" :value="todo.text" ref="inputField" />
                <div>
                    <button type="button" @click="saveText">Save</button>
                    <button type="button" @click="editing = !editing">Cancel</button>
                </div>
            </div>
        </li>
        `,
};
