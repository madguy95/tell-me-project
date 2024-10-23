<template>
  <nav
    class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white"
    id="sidenav-main"
  >
    <div class="container-fluid">
      <!--Toggler-->
      <navbar-toggle-button @click.native="showSidebar"> </navbar-toggle-button>

      <router-link class="navbar-brand" to="/home">
        <img :src="logo" class="navbar-brand-img" alt="..." />
      </router-link>

      <slot name="mobile-right">
        <ul class="nav align-items-center d-md-none">
          <!-- <base-dropdown class="nav-item" menu-on-right tag="li" title-tag="a">
            <a
              slot="title-container"
              class="nav-link nav-link-icon"
              href="#"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="ni ni-bell-55"></i>
            </a>

            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Something else here</a>
          </base-dropdown> -->
          <div class="login-button-container" v-if="!isAuthenticated">
            <router-link class="navbar-brand" to="/home">
              <b-button variant="default">{{
                $route.path === "/home" ? "Đăng Nhập" : "Trang chủ"
              }}</b-button>
            </router-link>
          </div>
          <base-dropdown v-if="isAuthenticated" class="nav-item" menu-on-right tag="li" title-tag="a">
            <a slot="title-container" class="nav-link" href="#" role="button">
              <div class="media align-items-center">
                <span class="avatar avatar-sm rounded-circle">
                  <img alt="Image placeholder" src="img/theme/team-4.jpg" />
                </span>
              </div>
            </a>

            <div class="dropdown-header noti-title">
              <h6 class="text-overflow m-0">Welcome!</h6>
            </div>
            <div class="dropdown-item">
              <span class="text-overflow m-0">{{user.email}}</span>
            </div>
            <!-- <router-link to="/profile" class="dropdown-item">
              <i class="ni ni-single-02"></i>
              <span>My profile</span>
            </router-link>
            <router-link to="/profile" class="dropdown-item">
              <i class="ni ni-settings-gear-65"></i>
              <span>Settings</span>
            </router-link>
            <router-link to="/profile" class="dropdown-item">
              <i class="ni ni-calendar-grid-58"></i>
              <span>Activity</span>
            </router-link>
            <router-link to="/profile" class="dropdown-item">
              <i class="ni ni-support-16"></i>
              <span>Support</span>
            </router-link> -->
            <div class="dropdown-divider"></div>
            <a href="#!"  @click="onClickLogout" class="dropdown-item">
              <i class="ni ni-user-run"></i>
              <span>Logout</span>
            </a>
          </base-dropdown>
        </ul>
      </slot>
      <slot></slot>
      <div
        v-show="$sidebar.showSidebar"
        class="navbar-collapse collapse show"
        id="sidenav-collapse-main"
      >
        <div class="navbar-collapse-header d-md-none">
          <div class="row">
            <div class="col-6 collapse-brand">
              <router-link to="/home">
                <img :src="logo" />
              </router-link>
            </div>
            <div class="col-6 collapse-close">
              <navbar-toggle-button
                @click.native="closeSidebar"
              ></navbar-toggle-button>
            </div>
          </div>
        </div>

        <ul class="navbar-nav">
          <slot name="links"> </slot>
        </ul>
        <!--Divider-->
        <hr class="my-3" />
        <!--Heading-->
        <h6 class="navbar-heading text-muted">Liên Hệ</h6>
        <!--Navigation-->
        <ul class="navbar-nav mb-md-3">
          <li class="nav-item">
            <a class="nav-link" href="https://www.facebook.com/duantellmehmu">
              <i class="fab fa-facebook"></i> Trang Facebook
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="fas fa-envelope"></i> Email: duantellme.hmu@gmail.com
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="fas fa-phone"></i> Hotline: 0375458921 (Ms. Thu Trang)
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import NavbarToggleButton from "@/components/NavbarToggleButton";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "sidebar",
  components: {
    NavbarToggleButton,
  },
  props: {
    logo: {
      type: String,
      default: "/img/logo.svg",
      description: "Sidebar app logo",
    },
    autoClose: {
      type: Boolean,
      default: true,
      description:
        "Whether sidebar should autoclose on mobile when clicking an item",
    },
  },
  provide() {
    return {
      autoClose: this.autoClose,
    };
  },
  computed: {
    ...mapState(["user"]),
    ...mapGetters(["isAuthenticated"]),
  },
  methods: {
    ...mapActions(["logout"]),
    async onClickLogout() {
      try {
        await this.logout();
        this.$router.push("/login"); // Redirect on success
      } catch (err) {
        this.error = err.message; // Handle login errors
      }
    },
    closeSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    showSidebar() {
      this.$sidebar.displaySidebar(true);
    },
  },
  beforeDestroy() {
    if (this.$sidebar.showSidebar) {
      this.$sidebar.showSidebar = false;
    }
  },
};
</script>
