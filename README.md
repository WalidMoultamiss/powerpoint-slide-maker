# Slide maker
### You are a dev no need to learn how to create a powerpoint slides
## What you need ?

<a href="http://slide.byteforce.ma">try it for free on slide.byteforce.ma</a>

Ask chatGPT:

```
Hi create a {{9}} slides talk about {{Comment Choisir les Bonnes Technologies pour Lancer Votre Projet Logiciel}} 
each slide comments must be {{3-4}} min talks, the slides' content must includes only the bullets.
the return must be a JSON like this

{
  slides: [
    {
      title: "",
      content: [
        ""
      ],
      comments: [
        ""
      ]
    }...
  ]
}

```

```typescript
  type Slide = {
  title: string;
  content: string[];
  comments: string[];
};

type Presentation = {
  slides: Slide[];
};

const presentation: Presentation = {
  slides: [
    {
      title: "Comment Choisir les Bonnes Technologies pour Lancer Votre Projet Logiciel",
      content: [
        "Perspectives de Walid Moultamiss, PDG de ByteForce",
        "Fond épuré sur le thème de la technologie avec le logo de votre entreprise"
      ],
      comments: [
        "Je m'appelle Walid Moultamiss et je suis le fondateur et PDG de ByteForce..."
      ]
    },
    {
      title: "Qui suis-je ?",
      content: [
        "Fondateur/PDG de ByteForce : Solutions logicielles personnalisées web/mobile",
        "Expertise : Développement full-stack, UI/UX, architecture évolutive",
        "Mission : Fournir des solutions numériques sur mesure pour les clients marocains et internationaux"
      ],
      comments: [
        "Je suis le fondateur de ByteForce, une entreprise spécialisée dans les solutions logicielles sur mesure..."
      ]
    }
  ]
};
```
![image](https://github.com/user-attachments/assets/71d09529-f84a-435b-a82e-25e20653e04a)
![image](https://github.com/user-attachments/assets/d340dbd1-1b18-45b0-8495-9627a1fdf649)
![image](https://github.com/user-attachments/assets/25331cce-3071-4dd2-827d-62120d9c95bd)

## Comments' section
the comments section is a popup you can present the screen without it, you can also control the slides just from it
 
![image](https://github.com/user-attachments/assets/6db9ce58-d26e-4f37-82f8-32c4d5e7d2aa)
