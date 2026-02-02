# 跨平台 Demo / 模板工程

这是一个真正“跨平台”的 Vue 3 + Capacitor Demo 模板，保证同一套业务代码在 **Web 浏览器** 与 **Android App（Capacitor）** 中均可运行、无报错、体验合理。

## 项目介绍

本仓库提供一套“真正跨平台”的 Demo / 模板工程，目标是：

- **Web 浏览器** 与 **Android App（Capacitor）** 同时可运行
- 同一套业务代码，多端行为一致或有明确降级
- 平台差异集中在 `services/` 层，不散落在页面

## 技术栈

- Vue 3（Composition API）
- TypeScript（允许 JS/TS 混合）
- Vue Router / Pinia
- Vite
- UI：Vant
- 样式补充：Tailwind CSS（已关闭 preflight）
- HTTP：Axios
- 原生壳：Capacitor（Android）

## 设计原则（必须遵守）

- 同一套业务代码同时支持 Web 与 Android
- 页面禁止直接 import `@capacitor/*`
- 所有 Capacitor API 都必须有 Web fallback
- 平台差异只允许出现在 `services/` 层

## 目录结构

```
src/
 ├─ app/                    # 应用初始化（区分平台）
 ├─ router/
 ├─ store/
 ├─ services/
 │   ├─ platform/           # 平台判断与适配
 │   │   └─ env.ts          # isWeb / isAndroid
 │   ├─ native/             # Android 能力封装
 │   │   ├─ app.ts
 │   │   ├─ network.ts
 │   │   ├─ keyboard.ts
 │   │   ├─ toast.ts
 │   │   └─ statusBar.ts
 │   └─ http/
 ├─ composables/
 ├─ views/
 │   ├─ home/
 │   ├─ list/
 │   ├─ detail/
 │   └─ demos/
 ├─ components/
 ├─ styles/
```

## 跨平台能力与降级策略

1. **Android 物理返回键**
   - Android：`App.addListener('backButton')`，全局唯一入口
   - Web：使用浏览器历史 `router.back()` 作为降级，并输出提示

2. **Dialog / Popup 返回行为**
   - 通过 `services/ui/overlay` 统一管理弹窗栈
   - Android 返回键优先关闭弹窗
   - Web 支持 ESC/手动关闭，无冲突

3. **App 生命周期**
   - Android：`App.pause / App.resume`
   - Web：`visibilitychange` 作为降级

4. **网络状态**
   - Android：`Capacitor Network`
   - Web：`navigator.onLine + online/offline events`
   - 统一封装于 `services/native/network.ts`

5. **键盘弹出**
   - Android：`Capacitor Keyboard`
   - Web：无侵入，不报错
   - TabBar 会根据键盘状态隐藏

6. **Toast**
   - Android：`Capacitor Toast`
   - Web：`Vant Toast`

7. **状态栏**
   - Android：`Capacitor StatusBar`
   - Web：空实现（no-op）

## 页面说明

- Home：导航入口
- List：下拉刷新 + 无限滚动 + 空态
- Detail：内容详情页
- Demos：能力入口与状态展示

## 运行与构建

### 环境准备

- Node.js 18+（建议 20+）
- JDK 17+
- Android Studio（含 Android SDK）
- Gradle 9.x（由 Android Studio 自动管理即可）

### Web（开发）

```bash
npm install
npm run dev
```

### Web（构建）

```bash
npm run build
```

### Android（Capacitor）

```bash
npm run build
npx cap sync android
npx cap run android
```

首次运行需要：

```bash
npx cap add android
```

### Android Studio 打开方式

```bash
npx cap open android
```

或在 Android Studio 中直接打开 `android/` 目录。

## 常见问题

1. **运行 `npm run dev` 报 Tailwind PostCSS 错误**
   - 已使用 `@tailwindcss/postcss`，确保 `postcss.config.cjs` 使用该插件

2. **Android 构建失败**
   - 确认 JDK 17+，并在 Android Studio 中选择正确的 JDK
   - 首次打开会自动同步 Gradle 与 AGP，按提示完成即可

3. **Web 与 Android 行为差异**
   - 请将平台差异放在 `services/` 层统一封装
   - 页面禁止直接引用 `@capacitor/*`

## 备注

- Gradle 9.x、AGP 与 JDK 17+ 可用
- Tailwind preflight 已关闭，避免覆盖 Vant 样式
- ESLint 为宽松配置，优先可维护性
