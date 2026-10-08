import { useState, useEffect } from 'react'

function FloatingHeart({ delay, left, size, duration }: { delay: number; left: number; size: number; duration: number }) {
  return (
    <div
      className="absolute bottom-0 animate-float opacity-0"
      style={{
        left: `${left}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        fontSize: `${size}rem`,
      }}
    >
      💕
    </div>
  )
}

function Sparkle({ top, left, delay }: { top: number; left: number; delay: number }) {
  return (
    <div
      className="absolute animate-sparkle text-yellow-300"
      style={{ top: `${top}%`, left: `${left}%`, animationDelay: `${delay}s` }}
    >
      ✨
    </div>
  )
}

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}
    >
      {children}
    </div>
  )
}

function App() {
  const [showContent, setShowContent] = useState(false)
  const [currentMessage, setCurrentMessage] = useState(0)

  const messages = [
    { emoji: '💖', text: 'Ульяна, ты — самое дорогое, что у меня есть' },
    { emoji: '🌟', text: 'Ты делаешь мой мир ярче просто тем, что ты есть' },
    { emoji: '🤗', text: 'Я так скучаю по тебе каждый день' },
    { emoji: '🦋', text: 'С тобой я могу быть собой — и это бесценно' },
    { emoji: '🌈', text: 'Ты — моя лучшая подруга, и я горжусь этим' },
    { emoji: '💫', text: 'Наша дружба — это сокровище, которое я берегу' },
    { emoji: '🌸', text: 'Спасибо, что ты такая настоящая и тёплая' },
  ]

  useEffect(() => {
    setTimeout(() => setShowContent(true), 500)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const hearts = Array.from({ length: 15 }, (_, i) => ({
    delay: i * 1.5,
    left: Math.random() * 100,
    size: 1 + Math.random() * 2,
    duration: 4 + Math.random() * 4,
  }))

  const sparkles = Array.from({ length: 10 }, (_, i) => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
    delay: i * 0.8,
  }))

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-rose-50 relative overflow-hidden">
      {/* Floating hearts background */}
      {hearts.map((heart, i) => (
        <FloatingHeart key={i} {...heart} />
      ))}

      {/* Sparkles */}
      {sparkles.map((sparkle, i) => (
        <Sparkle key={i} {...sparkle} />
      ))}

      {/* Main content */}
      <div className={`relative z-10 transition-all duration-1500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
          <div className="animate-bounce-slow">
            <span className="text-7xl md:text-9xl">💝</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 mt-8 animate-pulse-soft">
            Для моей лучшей подруги
          </h1>
          <h2 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-600 mt-4">
            Ульяны
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mt-6 max-w-md animate-fade-in-delayed">
            Этот сайт — маленькое напоминание о том, как сильно я тебя ценю ✨
          </p>
          <div className="mt-12 animate-bounce">
            <span className="text-3xl">↓</span>
          </div>
        </section>

        {/* Message Carousel */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4">
          <Section>
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl max-w-2xl mx-auto border border-pink-100">
              <div className="text-5xl mb-6 text-center transition-all duration-500">
                {messages[currentMessage].emoji}
              </div>
              <p className="text-xl md:text-2xl text-gray-700 text-center font-medium transition-all duration-500 min-h-[80px] flex items-center justify-center">
                {messages[currentMessage].text}
              </p>
              <div className="flex justify-center mt-6 gap-2">
                {messages.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === currentMessage ? 'bg-pink-500 w-6' : 'bg-pink-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </Section>
        </section>

        {/* Letters Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            
            <Section>
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-lg border border-purple-100 transform hover:scale-[1.02] transition-transform duration-300">
                <h3 className="text-2xl md:text-3xl font-bold text-purple-600 mb-4">💌 Почему ты особенная</h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Ульяна, ты — тот человек, рядом с которым всё становится лучше. Твоя улыбка способна 
                  осветить самый пасмурный день, а твои слова — поддержать, когда кажется, что весь мир против. 
                  Ты умеешь слушать так, как никто другой. Ты понимаешь без слов. И это — настоящее чудо.
                </p>
              </div>
            </Section>

            <Section>
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-lg border border-rose-100 transform hover:scale-[1.02] transition-transform duration-300">
                <h3 className="text-2xl md:text-3xl font-bold text-rose-600 mb-4">🥺 Как я скучаю</h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Каждый день без тебя — это день, которого не хватает. Я скучаю по нашим разговорам до утра, 
                  по нашему смеху до слёз, по тем моментам, когда мы просто молчали рядом, и этого было достаточно. 
                  Мне не хватает тебя рядом. Каждую секунду.
                </p>
              </div>
            </Section>

            <Section>
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-lg border border-pink-100 transform hover:scale-[1.02] transition-transform duration-300">
                <h3 className="text-2xl md:text-3xl font-bold text-pink-600 mb-4">🌟 Что ты для меня значишь</h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Ты — мой человек. Мой безопасный мир. Тот, кому я могу рассказать всё и быть уверенным, 
                  что меня поймут. Ты — доказательство того, что настоящая дружба существует. 
                  Я бесконечно благодарен/благодарна судьбе за то, что она свела нас.
                </p>
              </div>
            </Section>

            <Section>
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-lg border border-violet-100 transform hover:scale-[1.02] transition-transform duration-300">
                <h3 className="text-2xl md:text-3xl font-bold text-violet-600 mb-4">🦋 Мои обещания</h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Я обещаю всегда быть рядом, когда тебе нужна поддержка. Обещаю звонить, даже когда 
                  не могу найти слов. Обещаю ценить каждый момент с тобой и никогда не принимать 
                  нашу дружбу как должное. Ты заслуживаешь самого лучшего, и я буду стараться быть 
                  этим лучшим для тебя.
                </p>
              </div>
            </Section>

          </div>
        </section>

        {/* Final message */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
          <Section>
            <div className="max-w-2xl">
              <span className="text-8xl animate-pulse">❤️</span>
              <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mt-8">
                Ульяна, я тебя очень люблю
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 mt-6 leading-relaxed">
                Ты — лучшее, что случилось в моей жизни. Спасибо, что ты есть. 
                Спасибо за каждый момент, за каждую улыбку, за каждое «я рядом».
              </p>
              <p className="text-lg text-gray-500 mt-4">
                Твоя лучшая подруга / Твой лучший друг 💕
              </p>
              <div className="mt-12 flex justify-center gap-4 text-4xl animate-bounce-slow">
                <span>🌸</span>
                <span>💖</span>
                <span>✨</span>
                <span>💖</span>
                <span>🌸</span>
              </div>
            </div>
          </Section>
        </section>

        {/* Footer */}
        <footer className="py-12 text-center">
          <p className="text-gray-400 text-sm">
            Сделано с бесконечной любовью 💕
          </p>
          <p className="text-gray-300 text-xs mt-2">
            Для самой лучшей Ульяны на свете
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
