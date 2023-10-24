import "./style.scss";

import {App, Editor, Modal, Notice, Plugin, WorkspaceLeaf} from "obsidian";
import {CSVView, VIEW_TYPE_CSV} from "./view";
import SampleSettingTab from "./setting";
import {InsertLinkModal} from "./modal";
import {EmojiWidget} from "./emojiWidget"
import {Decoration} from "@codemirror/view";
interface MyPluginSettings {
    mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
    mySetting: "default",
};

export default class MyPlugin extends Plugin {
    // @ts-ignore
    settings: MyPluginSettings;

    async onload() {
        await this.loadSettings();

        this.registerView(
            VIEW_TYPE_CSV,
            (leaf: WorkspaceLeaf) => new CSVView(leaf)
        );
        this.registerExtensions(["csv"], VIEW_TYPE_CSV);

        this.addSettingTab(new SampleSettingTab(this.app, this));

        // 左侧菜单显示插件图标，点击可以出发提示语
        this.addRibbonIcon('dice', 'redtea is good', () => {
            new Notice('This is a redtea first plugin!');
        });

        //添加插入链接 对应的文件是modal.ts
        // 流程上可以考虑从这里读取文件夹的文件名， 添加到新的页面中中
        this.addCommand({
            id: "insert-link",
            name: "Insert link",
            editorCallback: (editor: Editor) => {
                const selectedText = editor.getSelection();

                //增加emoji表情替换
                const decoration = Decoration.replace({
                    widget: new EmojiWidget()
                });

                const onSubmit = (text: string, url: string) => {
                    //原来可以添加网络连接的
                    // editor.replaceSelection(`[${text}](${url})`);
                    editor.replaceSelection( `👉[[${text}]]` );

                };

                new InsertLinkModal(this.app, selectedText, onSubmit).open();
            },
        });
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());


    }

    async saveSettings() {
        await this.saveData(this.settings);
    }
}
