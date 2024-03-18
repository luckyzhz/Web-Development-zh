<template>
    <li>
        <div v-if="!editing">
            <div>
                <!-- `v-model` 设置的双向绑定也不能直接修改 `props` 中的量, 所以这里改为绑定 `todo_data` -->
                <input type="checkbox" v-model="todo_data.finished" :id="todo.id" />
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
</template>

<script>
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
            todo_data: this.todo, // 新增的 `todo_data` 用于指向 props 的字段, 以便于修改
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
                // 不直接操作 `props` 中的 `todo`, 改为操作 `data` 中的 `todo_data`
                this.todo_data.text = editedText;
                this.editing = false;
            }
        },
    },
}
</script>

<!-- 添加 "scoped" 属性以限制 CSS 只应用于本组件 -->
<style scoped>
li {
    margin: 0.5rem 0;
    padding: 0.5rem;
}

li:nth-child(2n + 1) {
    background-color: rgba(250, 230, 210, 0.5);
}

li:nth-child(2n + 2) {
    background-color: rgba(210, 250, 230, 0.5);
}

input[type="checkbox"]:checked+label {
    text-decoration: line-through;
}

input[type="text"] {
    width: 100%;
    font-size: 1rem;
    line-height: 2;
}
</style>
