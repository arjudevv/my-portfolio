import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Legacy components kept for reference but not used in main portfolio
    "src/components/AboutFaceScene.tsx",
    "src/components/HeroBackground.tsx",
    "src/components/HeroFaceModel.tsx",
    "src/components/HeroScene.tsx",
    "src/components/HeroSceneContent.tsx",
    "src/components/HeroSceneShape.tsx",
    "src/components/ShaderPlayground.tsx",
    "src/components/NeonRoboticMaterial.tsx",
    "src/components/VisualControls.tsx",
    "src/components/PolishToggle.tsx",
    "src/components/ThemeToggle.tsx",
    "src/components/ProjectCard.tsx",
    "src/components/LottiePlayer.tsx",
    "src/hooks/useAudioReactive.ts",
    "src/lib/glsl.ts",
    "src/lib/useLazyGLTF.ts",
  ]),
]);

export default eslintConfig;
