<template>
    <el-dialog :title="title" :visible="dialogFormVisible" @close="close">
        <el-form :model="form">
            <block v-for="item in form.labelname" :key="item.id">
                <el-form-item :label="item.name" :label-width="formLabelWidth">
                    <template v-if="item.state == 1">
                        <el-select v-model="item.model" :placeholder="item.placeholder">
                            <el-option label="单位名称1" value="shanghai"></el-option>
                            <el-option label="单位名称2" value="beijing"></el-option>
                        </el-select>
                    </template>
                    <template v-else-if="item.state == 2">
                        <el-radio-group v-model="form.sex">
                            <el-radio label="男"></el-radio>
                            <el-radio label="女"></el-radio>
                        </el-radio-group>
                    </template>
                    <template v-else>
                        <el-input v-model="form.username" autocomplete="off"></el-input>
                    </template>
                </el-form-item>
            </block>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="create">立即创建</el-button>
            <el-button @click="reset">重置</el-button>
        </div>
    </el-dialog>
</template>
<script>
export default {
    props:{
        form:Object,
        formLabelWidth:String,
        dialogFormVisible:Boolean,
        title:{
            type:String,
            default:""
        }
    },
    methods: {
        close() {
            this.$emit("close")
        },
        reset() {
            this.$emit("reset")
        },
        create() {
            this.$emit("create")
        }
    }
}
</script>