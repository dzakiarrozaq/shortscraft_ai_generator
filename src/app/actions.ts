"use server";

import Groq from "groq-sdk";

export interface ShortsCraftResponse {
  topic: string;
  language: "id" | "en" | "ja";
  latencyMs: number;
  pillar1_hook: {
    script: string;
    durationSeconds: number;
    retentionScore: number;
    psychologicalBreakdown: {
      patternInterrupt: string;
      mechanism: string;
    };
    translations: {
      id: string;
      en: string;
      ja: string;
    };
  };
  pillar2_pacing: {
    cadence: string;
    cuts: Array<{
      timeframe: string;
      cameraMove: string;
      visualDescription: string;
    }>;
    audioArchitecture: string;
  };
  pillar3_genai: {
    midjourneyPrompt: string;
    aspectRatio: string;
    engine: string;
    flags: string[];
  };
}

export async function generateBlueprint(topic: string): Promise<ShortsCraftResponse> {
  const apiKey = process.env.GROQ_API_KEY;
  const startTime = Date.now();
  
  const isMariana = topic.toLowerCase().includes("mariana");
  const isKrakatau = topic.toLowerCase().includes("krakatau");

  if (!apiKey) {
    // Return mock response if no API key is provided
    await new Promise((resolve) => setTimeout(resolve, 600)); // Simulate latency
    
    // Dynamic mock for Pillar 2 based on topic
    let cuts = [
      { timeframe: "0.0 - 1.2s", cameraMove: "Whip Pan", visualDescription: "Violent whip pan transition into high-contrast archival footage. Glitch effect." },
      { timeframe: "1.2 - 3.5s", cameraMove: "Kinetic Typography", visualDescription: `Desaturated monochrome with punch-in text emphasizing keywords about ${topic}.` },
      { timeframe: "3.5 - 5.0s", cameraMove: "Hard Reveal", visualDescription: "Screen snaps to deep sepia vignette onto glowing subject with soft edge lighting." }
    ];
    let audio = "Distorted sub-bass hit at 0.0s → mechanical film whirring → silence at 3.5s";
    let prompt = `Cinematic wide establishing shot of ${topic}, dense atmospheric fog, dramatic god rays piercing, deep contrast, film grain, historical documentary aesthetic, shot on 35mm anamorphic lens, hyper-realistic, 8k resolution`;

    if (isMariana) {
      cuts = [
        { timeframe: "0.0 - 1.2s", cameraMove: "Crash Zoom", visualDescription: "Rapid plunge into pitch black oceanic depths, sonar sweep illuminating the screen." },
        { timeframe: "1.2 - 3.5s", cameraMove: "Slow Pan", visualDescription: "Bioluminescent typography '11,000 METERS' pulses to the heartbeat of the sound." },
        { timeframe: "3.5 - 5.0s", cameraMove: "Wide Reveal", visualDescription: "Monolithic underwater structure barely visible in the trench depths." }
      ];
      audio = "Deep oceanic pressure sub-bass → sonar ping echo → eerie silence";
      prompt = "Ultra-deep ocean exploration submersible in the abyssal zone of Mariana Trench, bioluminescent deep sea trench creatures in pitch black water, harsh robotic headlights revealing eldritch underwater monolithic formation, cinematic atmospheric lighting, unreal engine 5 render, 8k resolution";
    } else if (isKrakatau) {
      cuts = [
        { timeframe: "0.0 - 1.2s", cameraMove: "Flash Cut", visualDescription: "Instant blinding white flash fading into sepia-toned archival illustration of a volcano." },
        { timeframe: "1.2 - 3.5s", cameraMove: "Shake/Rumble", visualDescription: "Heavy camera shake, text '3,000 MILES AWAY' stamps onto screen in bold red." },
        { timeframe: "3.5 - 5.0s", cameraMove: "Dolly Out", visualDescription: "Slow reveal of the sun being completely blocked out by an ash cloud." }
      ];
      audio = "Deafening explosion SFX at 0.0s instantly muffled → low frequency volcanic rumble";
      prompt = "Catastrophic volcanic eruption of Krakatoa 1883 in the Sunda Strait, towering ash column punching through storm clouds, volcanic lightning storm illuminating night sky, colossal pyroclastic flow over ocean, historical archive oil painting aesthetic, photorealistic 8k";
    }

    return {
      topic,
      language: "id",
      latencyMs: Date.now() - startTime,
      pillar1_hook: {
        script: `"Gila! Rahasia ${topic} akhirnya terungkap dan ini akan mengubah sejarah!"`,
        durationSeconds: 5,
        retentionScore: 92,
        psychologicalBreakdown: {
          patternInterrupt: "Sensory Friction",
          mechanism: "Creates immediate shock with hyper-specific claim.",
        },
        translations: {
          id: isMariana ? `"Di kedalaman 11.000 meter Palung Mariana, sonar mendeteksi suara yang bukan milik hewan laut!"` : (isKrakatau ? `"Ledakan 1883 ini mengubah langit bumi jadi gelap 3 hari!"` : `"Gila! Rahasia ${topic} ini dihapus dari buku sejarah!"`),
          en: isMariana ? `"At 36,000 feet down in the Mariana Trench, sonars detected an impossible signal!"` : (isKrakatau ? `"This 1883 blast blacked out the sun for 3 days!"` : `"Insane! The dark secret of ${topic} is wiped from history!"`),
          ja: isMariana ? `"マリアナ海溝水深11000mで、生物学上ありえない怪音が記録された！"` : (isKrakatau ? `"1883年の大爆発で、地球の空が3日間真っ暗に染まった！"` : `"ヤバい！${topic}の秘密が歴史から消された！"`),
        },
      },
      pillar2_pacing: {
        cadence: "High Frenzy (0-5s)",
        cuts: cuts,
        audioArchitecture: audio
      },
      pillar3_genai: {
        midjourneyPrompt: prompt,
        aspectRatio: "9:16",
        engine: "Midjourney v6.0",
        flags: ["--ar 9:16", "--v 6.0", "--style raw", "--c 5"]
      }
    };
  }

  const groq = new Groq({ apiKey });

  const schemaDefinition = `
{
  "pillar1_hook": {
    "script": "string",
    "durationSeconds": 5,
    "retentionScore": 95,
    "psychologicalBreakdown": { "patternInterrupt": "string", "mechanism": "string" },
    "translations": { "id": "string", "en": "string", "ja": "string" }
  },
  "pillar2_pacing": {
    "cadence": "string",
    "cuts": [
      { "timeframe": "0.0 - 1.2s", "cameraMove": "string", "visualDescription": "string" },
      { "timeframe": "1.2 - 3.5s", "cameraMove": "string", "visualDescription": "string" },
      { "timeframe": "3.5 - 5.0s", "cameraMove": "string", "visualDescription": "string" }
    ],
    "audioArchitecture": "string"
  },
  "pillar3_genai": {
    "midjourneyPrompt": "string (cinematic 9:16 prompt based on the topic)",
    "aspectRatio": "9:16",
    "engine": "Midjourney v6.0",
    "flags": ["--ar 9:16", "--v 6.0", "--style raw", "--c 5"]
  }
}
  `;

  const systemPrompt = `You are ShortsCraft AI, a master of viral short-form video retention engineering. 
Output a structured JSON (strictly JSON, no markdown wrapping, no extra text) matching exactly this schema:
${schemaDefinition}
The input will be a topic. Generate a highly engaging 5-second retention blueprint containing a spoken hook, kinetic pacing visual cuts (Pillar 2), and a cinematic Midjourney prompt (Pillar 3) that directly visualize the specific topic requested.`;

  const userPrompt = `Topic: ${topic}`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      model: "qwen/qwen3.8-27b",
      response_format: { type: "json_object" },
      temperature: 0.6,
      max_tokens: 800,
    });

    const responseText = completion.choices[0]?.message?.content || "{}";
    const data = JSON.parse(responseText);

    return {
      topic,
      language: "id",
      latencyMs: Date.now() - startTime,
      pillar1_hook: data.pillar1_hook,
      pillar2_pacing: data.pillar2_pacing,
      pillar3_genai: data.pillar3_genai,
    };
  } catch (error) {
    console.error("Groq API Error:", error);
    throw new Error("Failed to generate blueprint");
  }
}
