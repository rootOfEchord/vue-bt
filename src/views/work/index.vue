<template>
    <div class="test">
        <upLoader />
    </div>
</template>

<script>
import upLoader from '@/components/upLoader'
export default {
    name: 'test',
    components: {
        upLoader
    },
    data() {
        return {}
    },

    methods: {
        set() {
            setTimeout(res => {}, 123)
        }
    }
}
</script>

<style lang="less" scoped>
.test {
}
</style>
