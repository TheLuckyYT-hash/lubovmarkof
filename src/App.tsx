import { useState, useEffect, useCallback } from 'react'

interface Heart {
  id: number
  x: number
  y: number
  size: number
  emoji: string
}

function ClickHearts({ hearts }: { hearts: Heart[] }) {
  return (
    <>
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="fixed pointer-events-none animate-click-heart z-50"
          style={{
            left: heart.x,
            top: heart.y,
            fontSize: `${heart.size}rem`,
          }}
        >
          {heart.emoji}
        </div>
      ))}
    </>
  )
}

function App() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')
  const [isAnimating, setIsAnimating] = useState(false)
  const [clickHearts, setClickHearts] = useState<Heart[]>([])
  const [openCards, setOpenCards] = useState<Set<number>>(new Set())
  const [hugs, setHugs] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [loveMeter, setLoveMeter] = useState(0)

  const totalSlides = 6

  const heartEmojis = ['💖', '💕', '💗', '💝', '💘', '❤️', '🩷', '🤍', '💜', '🌸']

  const handleClick = useCallback((e: React.MouseEvent) => {
    const newHearts: Heart[] = Array.from({ length: 3 }, (_, i) => ({
      id: Date.now() + i,
      x: e.clientX + (Math.random() - 0.5) * 40,
      y: e.clientY + (Math.random() - 0.5) * 40,
      size: 1.5 + Math.random() * 2,
      emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
    }))
    setClickHearts((prev) => [...prev, ...newHearts])
    setTimeout(() => {
      setClickHearts((prev) => prev.filter((h) => !newHearts.find((nh) => nh.id === h.id)))
    }, 1500)
  }, [])

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return
    setDirection(index > currentSlide ? 'next' : 'prev')
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentSlide(index)
      setTimeout(() => setIsAnimating(false), 500)
    }, 300)
  }

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) goToSlide(currentSlide + 1)
  }

  const prevSlide = () => {
    if (currentSlide > 0) goToSlide(currentSlide - 1)
  }

  const toggleCard = (index: number) => {
    setOpenCards((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  const giveHug = () => {
    setHugs((prev) => prev + 1)
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 2000)
  }

  const addLove = () => {
    setLoveMeter((prev) => Math.min(prev + 10, 100))
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide()
      if (e.key === 'ArrowLeft') prevSlide()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentSlide, isAnimating])

  const renderSlide = () => {
    switch (currentSlide) {
      case 0:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="animate-bounce-slow">
              <span className="text-8xl md:text-9xl">💝</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 mt-8">
              Для моей любимой
            </h1>
            <h2 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-600 mt-4">
              Ульяны
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mt-6 max-w-md">
              Нажимай на экран — он наполнится любовью 💕
            </p>
            <div className="mt-8 flex gap-3">
              <span className="text-3xl animate-pulse">👆</span>
              <span className="text-3xl animate-pulse" style={{ animationDelay: '0.3s' }}>💖</span>
              <span className="text-3xl animate-pulse" style={{ animationDelay: '0.6s' }}>✨</span>
            </div>
          </div>
        )

      case 1:
        return (
          <div className="flex flex-col items-center justify-center h-full px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-600 mb-8 text-center">
              💌 Почему ты особенная
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl w-full">
              {[
                { emoji: '🌟', text: 'Твоя улыбка освещает всё вокруг' },
                { emoji: '🤗', text: 'Ты понимаешь меня без слов' },
                { emoji: '💫', text: 'С тобой я могу быть собой' },
                { emoji: '🦋', text: 'Ты делаешь мир лучше просто тем, что ты есть' },
                { emoji: '🌸', text: 'Ты самая настоящая и тёплая' },
                { emoji: '💖', text: 'Ты — моё сокровище' },
              ].map((item, i) => (
                <button
                  key={i}
                  onClick={() => toggleCard(i)}
                  className={`p-5 rounded-2xl border-2 transition-all duration-500 transform hover:scale-105 cursor-pointer text-left ${
                    openCards.has(i)
                      ? 'bg-gradient-to-br from-pink-100 to-purple-100 border-pink-300 shadow-lg scale-105'
                      : 'bg-white/70 border-pink-200 hover:border-pink-400 shadow-md'
                  }`}
                >
                  <div className={`text-3xl mb-2 transition-transform duration-300 ${openCards.has(i) ? 'scale-125' : ''}`}>
                    {item.emoji}
                  </div>
                  <p className={`text-gray-700 font-medium transition-all duration-300 ${openCards.has(i) ? 'opacity-100' : 'opacity-70'}`}>
                    {item.text}
                  </p>
                  {openCards.has(i) && (
                    <div className="mt-2 text-sm text-pink-500 animate-fade-in">
                      ✨ Это правда!
                    </div>
                  )}
                </button>
              ))}
            </div>
            <p className="text-gray-400 text-sm mt-6">Нажми на карточки, чтобы открыть 💕</p>
          </div>
        )

      case 2:
        return (
          <div className="flex flex-col items-center justify-center h-full px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-rose-600 mb-6">
              🥺 Как я скучаю
            </h2>
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-xl max-w-xl border border-rose-100">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                Каждый день без тебя — это день, которого не хватает. Я скучаю по нашим разговорам, 
                по нашему смеху, по тем моментам, когда мы просто были рядом.
              </p>
              <div className="mt-6 flex justify-center gap-2 flex-wrap">
                {['💭', '🥺', '😢', '💔', '🫂'].map((emoji, i) => (
                  <span
                    key={i}
                    className="text-4xl animate-pulse cursor-pointer hover:scale-150 transition-transform"
                    style={{ animationDelay: `${i * 0.3}s` }}
                    onClick={addLove}
                  >
                    {emoji}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-400 mt-4">Нажми на эмодзи — каждое добавляет любовь 💕</p>
              
              {/* Love meter */}
              <div className="mt-6">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>Уровень тоски по тебе</span>
                  <span>{loveMeter}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-pink-400 to-rose-500 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${loveMeter}%` }}
                  />
                </div>
                {loveMeter >= 100 && (
                  <p className="text-pink-500 font-bold mt-2 animate-bounce">
                    МАКСИМУМ! Я НЕ МОГУ БЕЗ ТЕБЯ! 💖
                  </p>
                )}
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="flex flex-col items-center justify-center h-full px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-violet-600 mb-6">
              🦋 Мои обещания тебе
            </h2>
            <div className="space-y-4 max-w-lg w-full">
              {[
                { text: 'Всегда быть рядом, когда тебе нужна поддержка', emoji: '🤝' },
                { text: 'Звонить, даже когда не могу найти слов', emoji: '📱' },
                { text: 'Ценить каждый момент с тобой', emoji: '⏰' },
                { text: 'Никогда не принимать тебя как должное', emoji: '💎' },
                { text: 'Быть лучшим другом для тебя всегда', emoji: '👑' },
              ].map((promise, i) => (
                <div
                  key={i}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-md border border-violet-100 flex items-center gap-4 transform hover:scale-[1.03] hover:shadow-lg transition-all duration-300 cursor-default"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  <span className="text-3xl flex-shrink-0">{promise.emoji}</span>
                  <p className="text-gray-700 font-medium text-left">{promise.text}</p>
                  <span className="text-xl flex-shrink-0">✓</span>
                </div>
              ))}
            </div>
            <p className="text-violet-400 mt-6 text-sm">Все обещания — навсегда 💜</p>
          </div>
        )

      case 4:
        return (
          <div className="flex flex-col items-center justify-center h-full px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-6">
              🫂 Обними Ульяну
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Нажимай кнопку — каждое нажатие = одно объятие для тебя!
            </p>
            
            <button
              onClick={giveHug}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity animate-pulse" />
              <div className="relative bg-gradient-to-r from-pink-500 to-purple-500 text-white text-2xl md:text-3xl font-bold px-12 py-8 rounded-full shadow-2xl transform hover:scale-110 active:scale-95 transition-all duration-200">
                🤗 Обнять!
              </div>
            </button>

            {showConfetti && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {Array.from({ length: 20 }, (_, i) => (
                  <div
                    key={i}
                    className="absolute animate-confetti"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: '-10%',
                      animationDelay: `${Math.random() * 0.5}s`,
                      fontSize: `${1 + Math.random() * 2}rem`,
                    }}
                  >
                    {['💖', '✨', '🌸', '💕', '🦋', '🌟'][Math.floor(Math.random() * 6)]}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 bg-white/80 rounded-2xl p-6 shadow-lg border border-pink-100">
              <p className="text-2xl font-bold text-pink-600">
                Объятий отправлено: <span className="text-4xl">{hugs}</span>
              </p>
              {hugs > 0 && hugs < 5 && <p className="text-gray-500 mt-2">Продолжай! Ульяна чувствует каждое 💕</p>}
              {hugs >= 5 && hugs < 10 && <p className="text-gray-500 mt-2">Ого! Сколько тепла! 🥰</p>}
              {hugs >= 10 && hugs < 20 && <p className="text-gray-500 mt-2">Ульяна уже улыбается! 😊</p>}
              {hugs >= 20 && <p className="text-pink-500 font-bold mt-2">ТЫ ЛУЧШАЯ! БЕСКОНЕЧНАЯ ЛЮБОВЬ! 💖✨</p>}
            </div>
          </div>
        )

      case 5:
        return (
          <div className="flex flex-col items-center justify-center h-full px-4 text-center">
            <span className="text-8xl animate-pulse">❤️</span>
            <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mt-8">
              Ульяна, я тебя очень люблю
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mt-6 leading-relaxed max-w-lg">
              Ты — лучшее, что случилось в моей жизни. Спасибо, что ты есть.
              Спасибо за каждый момент, за каждую улыбку, за каждое «я рядом».
            </p>
            <div className="mt-8 flex gap-3 text-4xl">
              {['🌸', '💖', '✨', '💖', '🌸'].map((emoji, i) => (
                <span
                  key={i}
                  className="animate-bounce-slow cursor-pointer hover:scale-150 transition-transform"
                  style={{ animationDelay: `${i * 0.3}s` }}
                  onClick={handleClick as any}
                >
                  {emoji}
                </span>
              ))}
            </div>
            <p className="text-gray-400 mt-8 text-lg">
              С бесконечной любовью, твоя любимая 💕
            </p>
            <button
              onClick={() => goToSlide(0)}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full font-medium hover:scale-105 transition-transform shadow-lg"
            >
              🔄 Начать сначала
            </button>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-rose-50 relative overflow-hidden cursor-pointer select-none"
      onClick={handleClick}
    >
      {/* Click hearts */}
      <ClickHearts hearts={clickHearts} />

      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
          {Array.from({ length: 30 }, (_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-5%',
                animationDelay: `${Math.random() * 1}s`,
                fontSize: `${1 + Math.random() * 2}rem`,
              }}
            >
              {['💖', '✨', '🌸', '💕', '🦋', '🌟', '💜', '🩷'][Math.floor(Math.random() * 8)]}
            </div>
          ))}
        </div>
      )}

      {/* Slide counter */}
      <div className="fixed top-4 right-4 z-30 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-md">
        <span className="text-sm text-gray-500">
          {currentSlide + 1} / {totalSlides}
        </span>
      </div>

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-30 h-1 bg-pink-100">
        <div
          className="h-full bg-gradient-to-r from-pink-400 to-purple-500 transition-all duration-500"
          style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
        />
      </div>

      {/* Main slide area */}
      <div
        className={`h-screen transition-all duration-500 ${
          isAnimating
            ? direction === 'next'
              ? 'opacity-0 translate-x-10'
              : 'opacity-0 -translate-x-10'
            : 'opacity-100 translate-x-0'
        }`}
      >
        {renderSlide()}
      </div>

      {/* Navigation */}
      <div className="fixed bottom-6 left-0 right-0 z-30 flex justify-center items-center gap-4 px-4">
        <button
          onClick={(e) => { e.stopPropagation(); prevSlide() }}
          disabled={currentSlide === 0}
          className={`px-5 py-3 rounded-full font-medium shadow-lg transition-all duration-300 ${
            currentSlide === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-white/90 text-purple-600 hover:bg-purple-100 hover:scale-105 active:scale-95'
          }`}
        >
          ← Назад
        </button>

        {/* Dot navigation */}
        <div className="flex gap-2">
          {Array.from({ length: totalSlides }, (_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); goToSlide(i) }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === currentSlide
                  ? 'bg-pink-500 w-8 scale-110'
                  : 'bg-pink-200 hover:bg-pink-300'
              }`}
            />
          ))}
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); nextSlide() }}
          disabled={currentSlide === totalSlides - 1}
          className={`px-5 py-3 rounded-full font-medium shadow-lg transition-all duration-300 ${
            currentSlide === totalSlides - 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:scale-105 active:scale-95'
          }`}
        >
          Далее →
        </button>
      </div>

      {/* Keyboard hint */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-20">
        <p className="text-xs text-gray-300 hidden md:block">
          Используй ← → или пробел для навигации
        </p>
      </div>
    </div>
  )
}

export default App
