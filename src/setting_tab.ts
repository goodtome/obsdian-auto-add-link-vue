import {App, PluginSettingTab} from "obsidian";
import VueSamplePlugin from "./main";
import {createApp} from "vue";
import SettingTab from "./SettingTab.vue";

// 注册插件设置页
export class VueSamplePluginSettingTab extends PluginSettingTab {
    plugin: VueSamplePlugin;

    constructor(app: App, plugin: VueSamplePlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    // 当插件设置页被激活时显示的内容
    display() {
        const {containerEl} = this;
        containerEl.empty();
        // 挂载 SettingTab 组件
        createApp(SettingTab).mount(containerEl);
    }
}