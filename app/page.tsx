"use client"

import { useState } from "react"
import PowerPointGenerator from "../powerpoint-generator"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { themes } from "../themes"

const exampleData = {
  "slides": [
    {
      "title": "Comment Choisir les Bonnes Technologies pour Lancer Votre Projet Logiciel",
      "content": [
        "Perspectives de Walid Moultamiss, PDG de ByteForce",
        "Fond épuré sur le thème de la technologie avec le logo de votre entreprise"
      ],
      "comments": [
        "Je m'appelle Walid Moultamiss et je suis le fondateur et PDG de ByteForce. Depuis plus de quatre ans, je travaille dans le domaine technologique, et ma passion pour la transformation numérique m'a permis d'aider de nombreuses entreprises à évoluer grâce à des solutions logicielles performantes. Chez ByteForce, nous nous spécialisons dans le développement web et mobile sur mesure, en mettant l'accent sur des architectures robustes et évolutives. L'objectif de cette présentation est simple : vous aider à choisir les technologies qui correspondent à vos objectifs business, à la dynamique de vos équipes et aux spécificités de votre marché local. Au Maroc, l’écosystème technologique évolue rapidement et il est essentiel de prendre des décisions éclairées pour garantir le succès de votre projet."
      ]
    },
    {
      "title": "Qui suis-je ?",
      "content": [
        "Fondateur/PDG de ByteForce : Solutions logicielles personnalisées web/mobile",
        "Expertise : Développement full-stack, UI/UX, architecture évolutive",
        "Mission : Fournir des solutions numériques sur mesure pour les clients marocains et internationaux"
      ],
      "comments": [
        "Je suis le fondateur de ByteForce, une entreprise spécialisée dans les solutions logicielles sur mesure. Nous créons des applications web et mobiles adaptées aux besoins spécifiques de nos clients, en mettant l'accent sur la performance, la sécurité et l'expérience utilisateur. Mon expertise en tant que développeur full-stack m’a permis de travailler avec des technologies comme Node.js, GraphQL, MongoDB et Next.js, tout en accompagnant nos clients à chaque étape de leur projet. Ce qui nous distingue, c'est notre capacité à comprendre les besoins des entreprises locales et à adapter nos solutions en fonction des réalités du marché marocain et international."
      ]
    },
    {
      "title": "4 Piliers de la Sélection Technologique",
      "content": [
        "Temps de mise sur le marché",
        "Disponibilité des développeurs",
        "Coût & Budget",
        "Scalabilité & Maintenance"
      ],
      "comments": [
        "Lorsque vous choisissez une technologie pour votre projet, il est essentiel de considérer ces quatre piliers : le temps de mise sur le marché, la disponibilité des développeurs, le coût et le budget, ainsi que la scalabilité et la maintenance. Ces facteurs sont interconnectés et doivent être équilibrés pour garantir la réussite du projet. Par exemple, une technologie très performante peut être coûteuse et prendre du temps à maîtriser, tandis qu’une technologie populaire peut offrir une mise sur le marché plus rapide et une communauté de développeurs plus large. Nous allons maintenant explorer ces piliers en détail et discuter de la manière dont vous pouvez faire des choix technologiques judicieux en fonction de vos objectifs."
      ]
    },
    {
      "title": "La Rapidité Compte : Trouver l’équilibre entre les délais et la qualité",
      "content": [
        "Utiliser des frameworks matures (ex : Next.js, Firebase) pour le prototypage rapide",
        "Éviter les outils de niche qui nécessitent de longues courbes d’apprentissage",
        "Cas : Firebase Realtime Database pour des lancements MVP en quelques semaines"
      ],
      "comments": [
        "Quand il s'agit de lancer un projet rapidement, choisir des frameworks matures comme Next.js ou Firebase est essentiel. Ces technologies sont éprouvées, bien documentées et permettent de prototyper des applications en un temps record. Par exemple, Firebase Realtime Database nous permet de créer des MVPs et de les lancer en quelques semaines, offrant ainsi une solution scalable et performante pour les applications en temps réel. Au Maroc, nous faisons face à un environnement dynamique où le marché évolue rapidement, donc plus vous pouvez aller vite tout en maintenant un haut niveau de qualité, mieux c’est. C’est pourquoi j’utilise principalement des technologies comme Node.js et Next.js qui réduisent considérablement le temps de développement."
      ]
    },
    {
      "title": "Le Vivier de Talents : Pourquoi les Écosystèmes Locaux Comptent",
      "content": [
        "L’essor des talents technologiques au Maroc en JavaScript, Python et développement mobile",
        "Prioriser les stacks populaires (React Native, Node.js) pour recruter plus rapidement",
        "Technologies de niche = coûts/délais plus élevés"
      ],
      "comments": [
        "Au Maroc, nous avons un vivier de talents en pleine expansion, en particulier dans des technologies comme JavaScript, Python et le développement mobile. React Native, par exemple, est un excellent choix pour le développement mobile cross-platform, et c’est aussi une technologie très populaire, ce qui facilite le recrutement de développeurs. Prioriser des stacks technologiques bien établis, comme Node.js ou React Native, vous permettra de trouver des talents plus facilement et à moindre coût. Par contre, choisir des technologies de niche peut entraîner des coûts de recrutement plus élevés et des délais supplémentaires en raison de la rareté des développeurs qualifiés dans ces domaines."
      ]
    },
    {
      "title": "Réalités Budgétaires : Open Source vs. Outils Entreprise",
      "content": [
        "Les outils open-source (PostgreSQL, MongoDB) réduisent les frais de licence",
        "Les services cloud (AWS, Firebase) offrent une flexibilité de paiement à l’usage",
        "Tarifs horaires des développeurs au Maroc : Trouver un équilibre entre qualité et coût"
      ],
      "comments": [
        "En ce qui concerne les coûts, l’utilisation d’outils open-source comme PostgreSQL et MongoDB peut réduire considérablement les frais de licence, ce qui est un atout majeur pour les projets qui doivent respecter un budget serré. De plus, les services cloud comme AWS ou Firebase offrent une grande flexibilité, avec des options de paiement à l’usage, ce qui permet d’ajuster les coûts en fonction des besoins réels de l’application. Cela permet aux entreprises marocaines de mieux gérer leurs budgets tout en ayant accès à des technologies de pointe. En parallèle, les tarifs horaires des développeurs au Maroc sont compétitifs, ce qui permet de réaliser des économies sans compromettre la qualité."
      ]
    },
    {
      "title": "Préparer Votre Stack pour l'Avenir",
      "content": [
        "Les architectures modulaires (GraphQL, microservices) permettent l’évolutivité",
        "TypeScript > JavaScript pour la maintenabilité à long terme",
        "Éviter les outils “tendance” sans support communautaire"
      ],
      "comments": [
        "Pour préparer votre projet à l’avenir, il est crucial de choisir des architectures modulaires comme GraphQL et des microservices. Ces technologies offrent une grande flexibilité pour évoluer en fonction des besoins futurs. Par exemple, GraphQL nous permet d’interroger les données de manière plus efficace et plus flexible que REST. En parallèle, TypeScript est une option bien plus robuste que JavaScript pour la maintenabilité à long terme, surtout lorsqu’on travaille sur des projets complexes. Enfin, il est important d’éviter les technologies qui sont seulement tendances mais qui manquent de support communautaire. Choisissez des solutions éprouvées qui ont fait leurs preuves et qui bénéficient d’une forte communauté."
      ]
    },
    {
      "title": "Stacks Prouvés pour les Équipes Marocaines",
      "content": [
        "Applications web : Next.js (TypeScript) + Node.js + GraphQL + MongoDB",
        "Mobile : Expo + React Native + Firebase",
        "Entreprise : NestJS + Hasura + PostgreSQL"
      ],
      "comments": [
        "Pour les applications web, j’utilise Next.js avec TypeScript, Node.js, GraphQL et MongoDB. Ces technologies permettent de créer des applications performantes et évolutives, tout en optimisant l'expérience utilisateur. Pour les applications mobiles, Expo et React Native sont mes technologies de prédilection, car elles offrent une grande flexibilité et un développement cross-platform simplifié, surtout avec Firebase en back-end pour gérer les données en temps réel. Enfin, pour les applications d’entreprise, NestJS combiné avec Hasura et PostgreSQL permet de gérer des applications complexes et évolutives tout en offrant des performances exceptionnelles."
      ]
    },
    {
      "title": "Histoires de Succès Réelles",
      "content": [
        "Insérer 3 exemples d’applications (noms/logos) avec des descriptions en une ligne",
        "Exemple : 'Plateforme e-commerce évoluant vers 50k utilisateurs avec Next.js & NestJS.'"
      ],
      "comments": [
        "Nous avons eu la chance de travailler sur plusieurs projets réussis. Par exemple, pour une plateforme e-commerce, nous avons utilisé Next.js et NestJS pour supporter une base d’utilisateurs en pleine croissance, avec plus de 50 000 utilisateurs. Dans un autre cas, une application mobile développée avec Expo et Firebase a permis de réduire le temps de mise sur le marché tout en offrant une expérience utilisateur fluide. Ces projets montrent l'impact direct de choisir les bonnes technologies adaptées aux besoins spécifiques de chaque client."
      ]
    },
    {
      "title": "Discutons de Votre Projet !",
      "content": [
        "Vos informations de contact, site web de ByteForce, réseaux sociaux"
      ],
      "comments": [
        "Si vous avez des questions sur la sélection des technologies, le recrutement de développeurs ou l'écosystème technologique au Maroc, je serais ravi d’en discuter. N’hésitez pas à me contacter ou à prendre rendez-vous pour une consultation gratuite. Nous avons de nombreuses idées à partager et des solutions adaptées à vos besoins spécifiques."
      ]
    }
  ]
}


export default function Home() {
  const [jsonInput, setJsonInput] = useState("")
  const [slidesData, setSlidesData] = useState(exampleData)
  const [selectedTheme, setSelectedTheme] = useState(themes[0].name)

  const handleSubmit = () => {
    try {
      const parsedData = JSON.parse(jsonInput)
      setSlidesData(parsedData)
    } catch (error) {
      alert("Invalid JSON. Please check your input and try again.")
    }
  }

  const insertExample = () => {
    setJsonInput(JSON.stringify(exampleData, null, 2))
  }

  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">PowerPoint Slide Generator</h1>
      <div className="flex flex-col md:flex-row gap-8 px-4">
        <div className="w-full md:w-1/3 space-y-4">
          <Textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder="Enter your JSON here..."
            className="h-[calc(100vh-250px)] resize-none"
          />
          <div className="flex gap-4">
            <Button onClick={handleSubmit}>Generate Slides</Button>
            <Button variant="outline" onClick={insertExample}>
              Insert Example
            </Button>
          </div>
        </div>
        <div className="w-full md:w-2/3">
          <PowerPointGenerator
            data={slidesData}
            updateData={setSlidesData}
            selectedTheme={selectedTheme}
            setSelectedTheme={setSelectedTheme}
          />
        </div>
      </div>
    </main>
  )
}

