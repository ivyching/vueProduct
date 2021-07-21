<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-4">
      <button class="btn btn-info" data-toggle="modal" @click="openModal(true)">
        建立新的優惠券
      </button>
    </div>

    <table class="table mt-4">
      <thead>
        <th>#</th>
        <th>優惠券名稱</th>
        <th>到期日</th>
        <th>折扣</th>
        <th>是否啟用</th>
        <th></th>
      </thead>
      <tbody></tbody>
    </table>

    <Pagination :getProducts="getCounpons" :pagination="pagination" />

    <div
      class="modal fade"
      id="counponModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content" style="border-radius: 10px">
          <div class="modal-header title">
            <h5 class="modal-title" id="exampleModalLabel">新增優惠券</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              style="color: white"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="modalBody">
              <div class="col-sm-12 form-group">
                <div class="col-sm-6">
                  <label>標題</label>
                  <input
                    class="form-control"
                    type="text"
                    placeholder="請輸入標題"
                    v-model="tempCounpon.title"
                    id="title"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import Pagination from "@/components/Pagination";
export default {
  data() {
    return {
      isLoading: false,
      pagination: {},
      isNew: false,
      tempCounpon: {
        title: "",
      },
    };
  },
  components: { Pagination },
  methods: {
    getCounpons(page = 1) {
      const vm = this;

      if (vm.pagination.total_pages == vm.pagination.current_page) {
        page = 1;
      }
      const api = `/api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`;

      vm.isLoading = true;

      this.$http.get(api).then((response) => {
        console.log(response);
        vm.products = response.data.products;
        vm.isLoading = false;
        vm.pagination = response.data.pagination;
      });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempCounpon = {};
        this.isNew = true;
      } else {
        this.tempCounpon = Object.assign({}, item);
        this.isNew = false;
      }
      $("#counponModal").modal("show");
    },
  },
  created() {
    this.getCounpons();
  },
};
</script>
<style>
.title {
  color: white;
  background-color: rgb(80, 76, 76);
  font-weight: bolder;
}
</style>