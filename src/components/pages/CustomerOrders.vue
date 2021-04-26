<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div
            style="
              height: 250px;
              background-size: cover;
              background-position: center;
            "
            :style="{ backgroundImage: `url(${item.imageUrl})` }"
          ></div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{
              item.category
            }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <!-- <div class="h5">2,800 元</div> -->
              <del class="h6">{{ item.origin_price | currency }}元</del>
              <div class="h5">現在只要 {{ item.price | currency }} 元</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              @click="getProduct(item.id)"
            >
              <i
                class="fas fa-spinner fa-spin"
                v-if="status.loadingItem == item.id"
              ></i>
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto">
              <i
                class="fas fa-spinner fa-spin"
                v-if="status.loadingItem == item.id"
              ></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content" style="border-radius: 10px">
          <div class="modal-header title">
            <h5
              class="modal-title"
              id="exampleModalLabel"
              :style="{ 'font-weight': 'bolder' }"
            >
              {{ product.title }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              style="color: black"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="modalBody">
              <div
                style="
                  height: 350px;
                  background-size: cover;
                  background-position: center;
                "
                :style="{ backgroundImage: `url(${product.imageUrl})` }"
              ></div>
              <div class="col-md-12 mt-4">
                <div class="title">
                  <h5
                    class="modal-title"
                    id="exampleModalLabel"
                    :style="{ 'font-weight': 'bolder' }"
                  >
                    {{ product.description }}
                  </h5>
                </div>
                <div class="mt-4">
                  <div
                    class="d-flex justify-content-between align-items-baseline"
                  >
                    <!-- <div class="h5">2,800 元</div> -->
                    <del class="h6"
                      >{{ product.origin_price | currency }}元</del
                    >
                    <div class="h5">
                      現在只要 {{ product.price | currency }} 元
                    </div>
                  </div>
                  <div class="mt-4">
                    <select
                      class="form-control"
                      name="unitOption"
                      id="unit"
                      @change="calculateTotalAmount()"
                      v-model="qty"
                    >
                      <option
                        v-bind:value="unitOption.value"
                        v-for="unitOption in unitOptions"
                        :key="unitOption.value"
                      >
                        {{ unitOption.text }} {{ product.unit }}
                      </option>
                    </select>
                  </div>
                  <div class="mt-4 fa-pull-right">
                    小計 {{ totalAmount }} 元
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {
      products: [],
      isLoading: false,
      product: {},
      status: {
        loadingItem: "",
      },
      totalAmount: 0,
      qty: 1,

      unitOptions: [
        { text: "1", value: 1 },
        { text: "2", value: 2 },
        { text: "3", value: 3 },
        { text: "4", value: 4 },
        { text: "5", value: 5 },
        { text: "6", value: 6 },
        { text: "7", value: 7 },
        { text: "8", value: 8 },
        { text: "9", value: 9 },
      ],
    };
  },
  methods: {
    getProducts(page = 1) {
      const vm = this;

      const url = `/api/${process.env.CUSTOMPATH}/products?page=${page}`;
      vm.isLoading = true;

      this.$http.get(url).then((response) => {
        vm.products = response.data.products;
        vm.isLoading = false;
      });
    },
    getProduct(id) {
      const vm = this;
      const url = `/api/${process.env.CUSTOMPATH}/product/${id}`;
      vm.status.loadingItem = id;
      this.$http.get(url).then((response) => {
        $("#productModal").modal("show");
        vm.product = response.data.product;
        vm.status.loadingItem = "";
      });
    },
    calculateTotalAmount() {
      let vm = this;
      let totalAmount = vm.product.price * vm.qty;

      vm.totalAmount = totalAmount;
    },
  },
  created() {
    this.getProducts();
  },
};
</script>