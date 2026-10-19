/*
 * OmniInteract 内容配置：根据用户修订的网站大纲生成。
 * 素材路径相对于 site/index.html；sections 数组顺序就是页面顺序。
 * enabled: false 可隐藏区域或演示；media.type 支持 image / video。
 * 未发布的链接与引用条目留空。Abstract 中 **...** 表示粗体。
 */
window.OMNIINTERACT_CONFIG = {
  "project": {
    "name": "OmniInteract",
    "subtitle": "Towards Unified Whole-Body Interaction Control for Dual Humanoids",
    "authors": [
      {
        "name": "Yinghao Li",
        "affiliations": "1,2"
      },
      {
        "name": "Tianyu Zhang",
        "affiliations": "2,3"
      },
      {
        "name": "Zhuohao Li",
        "affiliations": "1,2"
      },
      {
        "name": "Yi-Lin Wei",
        "affiliations": "1"
      },
      {
        "name": "Fa-Ting Hong",
        "affiliations": "4"
      },
      {
        "name": "Qing Zhang",
        "affiliations": "1"
      },
      {
        "name": "Wei-Shi Zheng",
        "affiliations": "1,2,†"
      }
    ],
    "affiliations": [
      {
        "id": 1,
        "name": "School of Computer Science and Engineering, Sun Yat-sen University",
        "shortName": "Sun Yat-sen University",
        "logo": "assets/logos/sysu.png",
        "url": "https://www.sysu.edu.cn/",
        "wideLogo": true
      },
      {
        "id": 2,
        "name": "Shenzhen Loop Area Institute",
        "shortName": "Shenzhen Loop Area Institute",
        "logo": "assets/logos/slai.png",
        "url": "https://www.slai.edu.cn/zh-hans/home",
        "wideLogo": true
      },
      {
        "id": 3,
        "name": "Beijing Institute of Technology",
        "shortName": "Beijing Institute of Technology",
        "logo": "assets/logos/bit.svg",
        "url": "https://www.bit.edu.cn/",
        "wideLogo": false
      },
      {
        "id": 4,
        "name": "The Hong Kong University of Science and Technology",
        "shortName": "HKUST",
        "logo": "assets/logos/hkust.svg",
        "url": "https://hkust.edu.hk/",
        "wideLogo": true
      }
    ],
    "authorNote": "† Corresponding author"
  },
  "resources": {
    "paper": "assets/OmniInteract.pdf",
    "arxiv": "",
    "code": ""
  },
  "hero": {
    "src": "assets/hero-user-cut-v4.mp4",
    "poster": "assets/hero-user-cut-v4.webp",
    "alt": "Two Unitree G1 robots performing close-contact sparring, kicking, boxing, fencing and dancing, using five complete user-selected clips",
    "caption": "Real-world deployment on two Unitree G1 robots",
    "logo": "assets/omniinteract-logo-transparent.png",
    "eyebrow": "CS.RO / Dual-Humanoid Interaction",
    "description": "OmniInteract learning diverse humanoid interactions from human demonstrations via surface-aware retargeting and residual learning."
  },
  "fullVideo": {
    "src": "assets/demos/OmniInteract_demo_web.mp4",
    "poster": "assets/project.webp",
    "captions": "assets/omniinteract-en.vtt",
    "captionLanguage": "en",
    "captionLabel": "English",
    "description": "English narration and embedded subtitles",
    "alt": "OmniInteract complete supplementary video with English narration and subtitles",
    "downloadName": "OmniInteract_Demo.mp4"
  },
  "sections": [
    {
      "id": "overview",
      "type": "overview",
      "enabled": true,
      "kicker": "Overview",
      "title": "Abstract",
      "description": "",
      "abstract": [
        "Physical interaction is a key capability for humanoid collaboration, requiring coordinated whole-body motion and precise contact. However, learning diverse dual-humanoid interactions faces two major challenges: (1) human-robot morphological differences disrupt contact interfaces and spatial relationships during retargeting, and (2) jointly learning motor skills and partner coordination makes it difficult to retain control fidelity as interaction diversity grows. In this paper, we propose **OmniInteract** to address these challenges through surface-aware modeling and scalable residual policy learning.",
        "First, we introduce **Surface Contact-Aware Retargeting**, which leverages dense human-robot surface correspondences to jointly retarget both humanoids, preserving explicit interaction contact interfaces and their near-field geometric context.",
        "Second, we propose a **Scalable Flow-based Interaction Policy** for partner-conditioned residual generation. It factorizes dual-humanoid control into a reusable motor foundation and interaction-specific adaptations: partner-aware experts learn corrections over a frozen whole-body motion prior, while conditional flow matching unifies them in a shared residual action space. This enables scalable skill consolidation while retaining pretrained motor capabilities.",
        "Extensive experiments demonstrate that OmniInteract improves retargeting fidelity and dual-humanoid coordination while better retaining interaction performance as skill diversity grows. Real-world deployment further demonstrates successful contact establishment, stable whole-body coordination, and recovery from external perturbations."
      ]
    },
    {
      "id": "interactions",
      "type": "gallery",
      "enabled": true,
      "kicker": "OmniInteract demos",
      // "title": "OmniInteract demos",
      // "description": "Coordinated whole-body interactions on two physical humanoids.",
      "items": [
        {
          "id": "kicking",
          "title": "Walking Arm in Arm",
          "category": "Coordinated Walking",
          "description": "The pair walks side by side with their arms linked, coordinating their steps while maintaining close contact.",
          "media": {
            "type": "video",
            "src": "assets/demos/arm.mp4",
            "poster": "assets/demos/kicking.webp",
            "alt": "Two humanoids coordinating raised-knee movements and close-range steps"
          },
          "enabled": true,
          "banner": {
            "description": "Coordinated Walking",
            "label": "REAL ROBOTS / 1.0×"
          }
        },
        {
          "id": "fencing",
          "title": "Fencing",
          "category": "Dynamic sparring",
          "description": "The two robots coordinate lunges, blade extensions, and footwork in a sequence of dynamic fencing exchanges.",
          "media": {
            "type": "video",
            "src": "assets/demos/fencing.mp4",
            "poster": "assets/demos/fencing.webp",
            "alt": "Two humanoids performing coordinated arm extensions and steps"
          },
          "enabled": true,
          "banner": {
            "description": "Dynamic sparring",
            "label": "REAL ROBOTS / 1.0×"
          }
        },
        {
          "id": "dancing",
          "title": "Dancing",
          "category": "Rhythmic coordination",
          "description": "The two robots synchronize turns, arm gestures, and footwork in a coordinated dance sequence.",
          "media": {
            "type": "video",
            "src": "assets/demos/dance.mp4",
            "poster": "assets/demos/dancing.webp",
            "alt": "Two humanoids performing a partner dance"
          },
          "enabled": true,
          "banner": {
            "description": "Shared steps, turns, and arm movements",
            "label": "REAL ROBOTS / 1.0×"
          }
        },
        {
          "id": "boxing",
          "title": "Boxing",
          "category": "Striking and defense",
          "description": "The two robots alternate punches, defensive movements, and stance adjustments in a sequence of dynamic boxing exchanges.",
          "media": {
            "type": "video",
            "src": "assets/demos/boxing-new.mp4",
            "poster": "assets/demos/boxing.webp",
            "alt": "Two humanoids performing repeated boxing arm motions"
          },
          "enabled": true,
          "banner": {
            "description": "Boxing motions with coordinated stances",
            "label": "REAL ROBOTS / 1.0×"
          }
        },
        {
          "id": "sparring",
          "title": "Blocking and Pushing",
          "category": "Path blocking",
          "description": "One robot moves laterally to block its partner's path, while the other changes direction and maneuvers to get past.",
          "media": {
            "type": "video",
            "src": "assets/demos/block.mp4",
            "poster": "assets/demos/sparring.webp",
            "alt": "Two humanoids coordinating arm movements and relative positioning during sparring"
          },
          "enabled": true,
          "banner": {
            "description": "Path blocking",
            "label": "REAL ROBOTS / 1.0×"
          }
        },
        {
          "id": "external-perturbations",
          "title": "External Perturbations",
          "category": "Adaptive recovery",
          "description": "An external push displaces one robot during its approach. Both robots adjust their motion to regain coordination and re-establish hand contact.",
          "media": {
            "type": "video",
            "src": "assets/demos/external-perturbations.mp4",
            "poster": "assets/demos/external-perturbations.webp",
            "alt": "External push and recovery demonstration, followed by a labeled half-speed replay",
            "caption": "Original-speed footage is followed by a labeled 0.5× replay."
          },
          "enabled": true,
          "banner": {
            "description": "Adapting to a push and establishing contact",
            "label": "REAL ROBOTS / REPLAY"
          }
        }
      ]
    },
    {
      "id": "comparison",
      "type": "comparison",
      "enabled": true,
      "kicker": "Retargeting comparison",
      "title": "Preserving interaction geometry.",
      "description": "Touch Head and Pat on Back examples compare local contact geometry alongside whole-body poses across retargeting methods.",
      "media": {
        "type": "image",
        "src": "assets/retargeting.webp",
        "alt": "Two rows of interaction retargeting examples, Touch Head and Pat on Back, comparing raw motion and five methods with close-ups of hand-to-body contact.",
        "caption": "Touch Head (top, InterHuman) and Pat on Back (bottom, Inter-X). Columns show raw motion, GMR, OmniRetarget, UMR, PHC, and SCAR. These are qualitative retargeting examples.",
        "width": 2400,
        "height": 862
      }
    },
    {
      "id": "method",
      "type": "method",
      "enabled": true,
      "kicker": "The method",
      "title": "Preserve the contact. Learn the coordination.",
      "description": "OmniInteract connects interaction-preserving motion references with partner-aware control, while reusing an existing whole-body motion prior.",
      "tabs": [
        {
          "id": "framework",
          "label": "Overview",
          "title": "From human motion to humanoid interaction.",
          "description": "Surface Contact-Aware Retargeting creates synchronized motion references. Partner-aware residual experts adapt a frozen motion tracker, then flow matching and DAgger consolidate these experts into a shared interaction policy.",
          "media": [
            {
              "type": "image",
              "src": "assets/method-overview.webp",
              "alt": "Three-stage OmniInteract overview: SCAR creates synchronized references, residual experts adapt a frozen SONIC tracker, and DAgger distillation trains a shared flow policy for interaction corrections.",
              "caption": "From human interactions to coordinated humanoid control: SCAR, residual interaction experts, and a unified flow-based policy.",
              "width": 2400,
              "height": 1077
            }
          ]
        },
        {
          "id": "scar",
          "label": "SCAR",
          "title": "Preserve the interaction geometry.",
          "description": "SCAR establishes dense correspondences between human and robot surfaces and jointly optimizes both humanoids to preserve contact interfaces and nearby geometry.",
          "media": [
            {
              "type": "image",
              "src": "assets/scar-pipeline.webp",
              "alt": "SCAR optimization diagram showing surface pose correspondences, contact interfaces, near-field context, and temporal and stance terms combined to retarget two humanoids jointly.",
              "caption": "SCAR jointly optimizes the paired robot motion under kinematic constraints.",
              "width": 2400,
              "height": 2400
            },
            {
              "type": "image",
              "src": "assets/scar-context.webp",
              "alt": "Human and SCAR robot close-ups compare contact interfaces, near-field context, and their combination.",
              "caption": "Joint retargeting preserves both where the bodies meet and the configuration of nearby surfaces.",
              "width": 2098,
              "height": 1508
            }
          ]
        },
        {
          "id": "unified-policy",
          "label": "Unified policy",
          "layout": "policy-comparison",
          "title": "One shared policy, two perspectives.",
          "description": "Residual interaction experts build on a frozen motion tracker. DAgger and flow matching consolidate them into a shared policy, run separately for each humanoid using its own motion context and its partner’s state.",
          "media": [
            {
              "type": "image",
              "src": "assets/unified-policy-panels.svg",
              "alt": "Interaction Expert Learning and Flow-based Interaction Learning: residual experts adapt a frozen SONIC tracker, then distillation and flow matching consolidate a unified residual policy.",
              // "caption": "Interaction expert learning and flow-based interaction learning, shown from the original method figure.",
              "width": 1424,
              "height": 1077
            }
          ],
          "comparisons": [
            {
              "id": "baseline",
              "title": "Baseline",
              "media": {
                "type": "video",
                "src": "assets/simulation/baseline.mp4",
                "poster": "assets/simulation/baseline.webp",
                "alt": "Baseline simulation of two humanoids performing an interaction"
              }
            },
            {
              "id": "omniinteract",
              "title": "OmniInteract",
              "media": {
                "type": "video",
                "src": "assets/simulation/omniinteract.mp4",
                "poster": "assets/simulation/omniinteract.webp",
                "alt": "OmniInteract simulation of two humanoids performing an interaction"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "resources",
      "type": "resources",
      "enabled": true,
      "kicker": "",
      "title": "Citation",
      "description": "",
      "bibtex": "@misc{li_omniinteract,\n  title = {{OmniInteract}: Towards Unified Whole-Body Interaction Control for Dual Humanoids},\n  author = {Li, Yinghao and Zhang, Tianyu and Li, Zhuohao and Wei, Yi-Lin and\n            Hong, Fa-Ting and Zhang, Qing and Zheng, Wei-Shi},\n  note = {Manuscript}\n}",
      "citationNote": ""
    }
  ]
};
