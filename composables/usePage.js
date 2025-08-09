//搜索和分页获取数据功能抽离
export async function usePage(initListApiCallback){
    const route = useRoute()
    const page = ref(parseInt(route.params.page))
    const per_page = ref(10)

    const {
        data,
        pending,
        error,
        refresh
    } = await initListApiCallback({
        page:page.value,
        per_page:per_page.value
    })
    // const rows = computed(()=>data.value?.list.data ?? [])
    // const total = computed(()=>data.value?.list.total ?? 0)
    const rows = ref(data?.value?.list?.data ?? [])
    const total = ref(data?.value?.list?.total ?? 0)

    const handlePageChange = (p)=>{
        navigateTo({
            params:{
                ...route.params,
                page:p
            },
            query:{
                ...route.query
            }
        })
    }

    return {
        page,
        per_page,
        data,
        pending,
        error,
        refresh,
        rows,
        total,
        handlePageChange
    }
}