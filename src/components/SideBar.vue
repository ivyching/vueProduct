<template>
  <div>
    <nav
      id="sidebarMenu"
      class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div class="position-sticky pt-3">
        <ul class="nav flex-column">
          <h6
            class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
          >
            <span>管理員</span>
          </h6>
          <li class="nav-item">
            <router-link to="products" class="nav-link" active-class="active"
              ><BIconMenuDown class="iconStyle2" />產品列表</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="orders" class="nav-link" active-class="active"
              ><BIconReceipt class="iconStyle2" />訂單列表</router-link
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <span data-feather="shopping-cart"></span>
              <BIconCardHeading class="iconStyle2" />優惠券
            </a>
          </li>
          <h6
            class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
          >
            <span>模擬功能</span>
          </h6>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <span data-feather="users"></span>
              <BIconMinecart class="iconStyle2" />模擬訂單
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<script>
import {
  BIconMenuDown,
  BIconReceipt,
  BIconCardHeading,
  BIconMinecart,
} from "bootstrap-vue";
export default {
  data() {
    return {
      isActive: false,
    };
  },
  components: {
    BIconMenuDown,
    BIconReceipt,
    BIconCardHeading,
    BIconMinecart,
  },
};
</script>
<style>
</style>