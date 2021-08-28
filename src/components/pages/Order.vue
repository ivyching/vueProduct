<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <table class="table mt-4">
      <thead>
        <th width="80">購買時間</th>
        <th width="100">Email</th>
        <th width="180">購買款項</th>
        <th width="120">應付金額</th>
        <th width="80" class="text-center">是否付款</th>
      </thead>
      <tbody>
        <tr v-for="item in OrderList" :key="item.id">
          <td>{{ item.create_at }}</td>
          <td>{{ item.user.email }}</td>
          <td>{{ item.category }}</td>
          <td class="text-right">{{ item.total }}</td>
          <td class="text-center">
            <span v-if="item.is_paid" class="text-success">是</span>
            <span v-else class="text-warning">否</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      OrderList: {},
      pagination: {},
      isLoading: false,
    };
  },
  methods: {
    getOrder(page) {
      const vm = this;

      if (vm.pagination.total_pages == vm.pagination.current_page) {
        page = 1;
      }
      const api = `/api/${process.env.CUSTOMPATH}/admin/orders?page=${page}`;

      vm.isLoading = true;

      this.$http.get(api).then((response) => {
        vm.OrderList = response.data.orders;
        vm.isLoading = false;
        vm.pagination = response.data.pagination;
      });
    },
  },
  created() {
    this.getOrder();
  },
};
</script>