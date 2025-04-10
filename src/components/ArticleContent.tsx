import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Eye, Calendar, ChevronRight, Home, Brain } from 'lucide-react';

interface ArticleContent {
  id: string;
  title: string;
  description: string;
  mainImage: string;
  content: {
    type: 'paragraph' | 'image' | 'subheading';
    content: string;
  }[];
  readTime: number;
  views: number;
  date: string;
}

const articlesContent: Record<string, ArticleContent> = {
  'how-to-boost-metabolism': {
    id: '1',
    title: 'Как запустить метаболизм: 7 научно доказанных способов',
    description: 'Узнайте, как естественным образом ускорить обмен веществ и начать эффективно терять вес без жестких диет.',
    mainImage: 'https://images.unsplash.com/photo-1486218119243-13883505764c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
    content: [
      {
        type: 'paragraph',
        content: 'Метаболизм играет ключевую роль в поддержании здорового веса и энергетического баланса организма. В этой статье мы рассмотрим научно доказанные способы его ускорения.'
      },
      {
        type: 'subheading',
        content: '1. Силовые тренировки'
      },
      {
        type: 'paragraph',
        content: 'Регулярные силовые тренировки помогают нарастить мышечную массу, которая сжигает больше калорий даже в состоянии покоя. Рекомендуется выполнять упражнения 2-3 раза в неделю.'
      },
      {
        type: 'image',
        content: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80'
      },
      {
        type: 'subheading',
        content: '2. Правильный режим питания'
      },
      {
        type: 'paragraph',
        content: 'Частое дробное питание небольшими порциями помогает поддерживать метаболизм на высоком уровне. Рекомендуется есть каждые 3-4 часа.'
      },
      {
        type: 'image',
        content: 'https://images.unsplash.com/photo-1547496502-affa22d38842?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80'
      },
      {
        type: 'subheading',
        content: '3. Достаточное количество белка'
      },
      {
        type: 'paragraph',
        content: 'Белок имеет высокий термический эффект: организм тратит больше энергии на его переваривание. Включайте источники белка в каждый прием пищи.'
      },
      {
        type: 'subheading',
        content: '4. Качественный сон'
      },
      {
        type: 'paragraph',
        content: 'Недостаток сна негативно влияет на метаболизм и гормональный фон. Старайтесь спать 7-9 часов в сутки.'
      },
      {
        type: 'image',
        content: 'https://images.unsplash.com/photo-1519003300449-424ad0405076?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80'
      },
      {
        type: 'subheading',
        content: '5. Питьевой режим'
      },
      {
        type: 'paragraph',
        content: 'Вода необходима для всех метаболических процессов. Пейте не менее 30 мл на килограмм веса в день.'
      },
      {
        type: 'subheading',
        content: '6. Специи и термогенные продукты'
      },
      {
        type: 'paragraph',
        content: 'Некоторые специи, такие как черный перец, имбирь и корица, могут временно ускорять метаболизм.'
      },
      {
        type: 'subheading',
        content: '7. Регулярная физическая активность'
      },
      {
        type: 'paragraph',
        content: 'Даже простая ходьба в течение 30 минут в день может значительно улучшить метаболизм.'
      },
      {
        type: 'image',
        content: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80'
      }
    ],
    readTime: 5,
    views: 1240,
    date: '15 марта 2024'
  },
  'intuitive-eating': {
    id: '2',
    title: 'Интуитивное питание: как научиться слушать свое тело',
    description: 'Полное руководство по интуитивному питанию: как освободиться от диет, научиться слушать свое тело и построить здоровые отношения с едой.',
    mainImage: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
    content: [
      {
        type: 'paragraph',
        content: 'Интуитивное питание – это революционный подход к здоровью и питанию, который помогает восстановить естественную связь с вашим телом и его потребностями. В отличие от традиционных диет, которые основаны на внешних правилах и ограничениях, интуитивное питание учит нас прислушиваться к внутренней мудрости нашего организма. Этот метод был разработан диетологами Эвелин Триболи и Элис Реш и основан на научных исследованиях в области психологии питания и физиологии.'
      },
      {
        type: 'subheading',
        content: 'Основные принципы интуитивного питания'
      },
      {
        type: 'paragraph',
        content: '1. Отказ от диет:\n• Признание вреда диетической культуры\n• Освобождение от правил "хорошей" и "плохой" еды\n• Доверие к естественным механизмам регуляции веса\n\n2. Уважение к голоду:\n• Своевременное распознавание сигналов голода\n• Регулярное питание для поддержания энергии\n• Предотвращение переедания из-за сильного голода\n\n3. Примирение с едой:\n• Разрешение есть любую пищу без чувства вины\n• Снятие запретов с "запрещенных" продуктов\n• Осознание, что одно пищевое решение не определяет здоровье\n\n4. Отказ от "полиции еды":\n• Прекращение осуждения себя за пищевые выборы\n• Избавление от мыслей о "сжигании калорий"\n• Развитие здорового отношения к движению'
      },
      {
        type: 'image',
        content: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80'
      },
      {
        type: 'subheading',
        content: 'Распознавание сигналов тела'
      },
      {
        type: 'paragraph',
        content: '1. Шкала голода и насыщения:\n\n1-2: Сильный голод, срочно нужна еда\n3-4: Умеренный голод, пора поесть\n5: Нейтральное состояние\n6-7: Комфортная сытость\n8-9: Переедание\n10: Крайний дискомфорт\n\n2. Физические сигналы голода:\n• Урчание в животе\n• Снижение энергии\n• Сложность с концентрацией\n• Легкое головокружение\n\n3. Сигналы насыщения:\n• Комфортное чувство наполненности\n• Снижение интереса к еде\n• Удовлетворение от приема пищи\n• Восстановление энергии'
      },
      {
        type: 'image',
        content: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80'
      },
      {
        type: 'subheading',
        content: 'Практические шаги к интуитивному питанию'
      },
      {
        type: 'paragraph',
        content: '1. Начальный этап:\n• Ведение дневника пищевых привычек\n• Отслеживание эмоций, связанных с едой\n• Наблюдение за физическими ощущениями\n• Изучение триггеров переедания\n\n2. Развитие осознанности:\n• Прием пищи без отвлечений\n• Тщательное пережевывание\n• Оценка вкуса и текстуры\n• Регулярные паузы во время еды\n\n3. Работа с эмоциональным питанием:\n• Распознавание эмоционального голода\n• Поиск альтернативных способов справляться со стрессом\n• Развитие здоровых механизмов копинга\n• Обращение за поддержкой при необходимости'
      },
      {
        type: 'image',
        content: 'https://images.unsplash.com/photo-1515023115689-589c33041d3c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80'
      },
      {
        type: 'subheading',
        content: 'Преодоление трудностей'
      },
      {
        type: 'paragraph',
        content: '1. Распространенные препятствия:\n• Страх потери контроля над весом\n• Недоверие к сигналам тела\n• Социальное давление\n• Укоренившиеся пищевые правила\n\n2. Стратегии преодоления:\n• Постепенный переход\n• Поддержка единомышленников\n• Работа со специалистом\n• Регулярная практика самосострадания\n\n3. Признаки прогресса:\n• Снижение тревоги вокруг еды\n• Улучшение отношений с телом\n• Стабильная энергия\n• Естественное регулирование веса'
      },
      {
        type: 'subheading',
        content: 'Долгосрочные результаты'
      },
      {
        type: 'paragraph',
        content: '1. Физические преимущества:\n• Стабильный вес без диет\n• Улучшение пищеварения\n• Нормализация метаболизма\n• Устойчивый уровень энергии\n\n2. Психологические преимущества:\n• Свобода от пищевых ограничений\n• Улучшение самооценки\n• Снижение тревожности\n• Здоровые отношения с едой\n\n3. Социальные преимущества:\n• Комфортное питание в обществе\n• Улучшение отношений с близкими\n• Позитивное влияние на окружающих\n• Свобода от сравнений и осуждения'
      }
    ],
    readTime: 12,
    views: 856,
    date: '14 марта 2024'
  },
  'reduce-calories': {
    id: '3',
    title: '10 простых способов уменьшить калорийность блюд',
    description: 'Эффективные кулинарные приемы, которые помогут сделать любимые блюда менее калорийными без потери вкуса.',
    mainImage: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
    content: [
      {
        type: 'paragraph',
        content: 'Снижение калорийности любимых блюд не означает, что вы должны жертвовать вкусом. Вот 10 простых способов сделать ваши блюда более полезными.'
      },
      {
        type: 'subheading',
        content: '1. Замена жирных соусов'
      },
      {
        type: 'paragraph',
        content: 'Используйте йогурт, горчицу или травы вместо майонеза. Это значительно снизит калорийность без потери вкуса.'
      },
      {
        type: 'image',
        content: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80'
      },
      {
        type: 'subheading',
        content: '2. Правильные методы приготовления'
      },
      {
        type: 'paragraph',
        content: 'Отдавайте предпочтение запеканию, варке или приготовлению на пару вместо жарки.'
      },
      {
        type: 'subheading',
        content: '3. Увеличение порции овощей'
      },
      {
        type: 'paragraph',
        content: 'Добавляйте больше овощей в любое блюдо для объема при меньшей калорийности.'
      },
      {
        type: 'image',
        content: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80'
      },
      {
        type: 'subheading',
        content: '4. Использование специй'
      },
      {
        type: 'paragraph',
        content: 'Специи и травы добавляют вкус без калорий. Экспериментируйте с разными комбинациями.'
      },
      {
        type: 'subheading',
        content: '5. Контроль порций'
      },
      {
        type: 'paragraph',
        content: 'Используйте меньшие тарелки и измеряйте порции для лучшего контроля калорий.'
      },
      {
        type: 'image',
        content: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80'
      }
    ],
    readTime: 4,
    views: 1567,
    date: '13 марта 2024'
  },
  'healthy-snacks': {
    id: '4',
    title: 'Правильный перекус: что есть между приемами пищи',
    description: 'Полное руководство по здоровым перекусам: как выбирать, готовить и сочетать продукты для поддержания энергии и контроля веса.',
    mainImage: 'https://images.unsplash.com/photo-1511690078903-71dc5a49f5e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
    content: [
      {
        type: 'paragraph',
        content: 'Правильно организованные перекусы играют важную роль в здоровом питании. Они помогают контролировать голод, поддерживать стабильный уровень сахара в крови и предотвращать переедание во время основных приемов пищи. В этой статье мы разберем все аспекты здорового перекуса: от выбора продуктов до оптимального времени приема.'
      },
      {
        type: 'subheading',
        content: 'Почему важны перекусы?'
      },
      {
        type: 'paragraph',
        content: 'Регулярные небольшие перекусы помогают:\n\n• Поддерживать стабильный уровень глюкозы в крови\n• Контролировать аппетит и предотвращать переедание\n• Обеспечивать организм постоянным притоком энергии\n• Улучшать концентрацию и работоспособность\n• Ускорять метаболизм\n• Способствовать усвоению питательных веществ'
      },
      {
        type: 'image',
        content: 'https://images.unsplash.com/photo-1479832912902-77089f02b1d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80'
      },
      {
        type: 'subheading',
        content: 'Правила здорового перекуса'
      },
      {
        type: 'paragraph',
        content: '1. Время: Делайте перерыв между приемами пищи 2-3 часа\n\n2. Размер порции: Перекус должен составлять 150-200 ккал\n\n3. Состав: Комбинируйте белки, сложные углеводы и полезные жиры\n\n4. Планирование: Готовьте здоровые снеки заранее, чтобы избежать покупки фастфуда\n\n5. Внимательность: Ешьте осознанно, не отвлекаясь на гаджеты'
      },
      {
        type: 'image',
        content: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80'
      },
      {
        type: 'subheading',
        content: 'Лучшие варианты здоровых перекусов'
      },
      {
        type: 'paragraph',
        content: '1. Фрукты и орехи:\n• Яблоко + 15-20 миндаля\n• Банан + 5-7 грецких орехов\n• Груша + 10-12 фундука\n\n2. Молочные продукты:\n• Греческий йогурт с ягодами\n• Творог с медом и семенами чиа\n• Сыр с цельнозерновыми крекерами\n\n3. Овощные снеки:\n• Морковные палочки с хумусом\n• Сельдерей с арахисовой пастой\n• Огурцы и помидоры черри с творожным дипом\n\n4. Белковые перекусы:\n• Вареное яйцо с цельнозерновым хлебцем\n• Тунец с авокадо\n• Куриная грудка с овощами'
      },
      {
        type: 'subheading',
        content: 'Перекусы для разных целей'
      },
      {
        type: 'paragraph',
        content: 'Для похудения:\n• Овощные смузи\n• Протеиновые коктейли\n• Яичные белки с овощами\n\nДля набора массы:\n• Смузи с бананом и арахисовой пастой\n• Протеиновые батончики\n• Сухофрукты с орехами\n\nДля поддержания энергии:\n• Цельнозерновые тосты с авокадо\n• Энергетические шарики из сухофруктов\n• Смузи боул с гранолой'
      },
      {
        type: 'image',
        content: 'https://images.unsplash.com/photo-1494859802809-d069c3b71a8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80'
      },
      {
        type: 'subheading',
        content: 'Продукты, которых следует избегать'
      },
      {
        type: 'paragraph',
        content: '• Сладкие батончики и конфеты\n• Чипсы и соленые снеки\n• Сладкие газированные напитки\n• Пакетированные соки\n• Выпечка и печенье\n• Готовые снеки с длительным сроком хранения'
      },
      {
        type: 'subheading',
        content: 'Практические советы'
      },
      {
        type: 'paragraph',
        content: '1. Подготовка: Нарежьте овощи и фрукты заранее и храните в контейнерах\n\n2. Порционность: Используйте небольшие контейнеры для контроля размера порций\n\n3. Доступность: Держите здоровые снеки на виду и под рукой\n\n4. Разнообразие: Чередуйте разные виды перекусов\n\n5. Гидратация: Не забывайте пить воду между перекусами'
      }
    ],
    readTime: 8,
    views: 923,
    date: '12 марта 2024'
  },
  'emotional-eating': {
    id: '5',
    title: 'Как справиться с эмоциональным перееданием',
    description: 'Полное руководство по преодолению эмоционального переедания: причины, диагностика и эффективные стратегии решения проблемы.',
    mainImage: 'https://images.unsplash.com/photo-1499744937866-d7e566a20a61?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
    content: [
      {
        type: 'paragraph',
        content: 'Эмоциональное переедание – это сложная форма пищевого поведения, при которой человек использует еду как способ справиться с негативными эмоциями, стрессом или тревогой. В отличие от физического голода, эмоциональное переедание не связано с потребностью организма в питании и может привести к серьезным проблемам со здоровьем и психологическим дискомфортом.'
      },
      {
        type: 'subheading',
        content: 'Признаки эмоционального переедания'
      },
      {
        type: 'paragraph',
        content: '1. Характерные особенности:\n• Внезапное появление сильного голода\n• Тяга к определенным продуктам (обычно к сладкому или фастфуду)\n• Продолжение еды даже после насыщения\n• Чувство вины после приема пищи\n\n2. Отличия от физического голода:\n• Возникает резко и требует немедленного удовлетворения\n• Связан с конкретными продуктами\n• Не проходит после насыщения\n• Сопровождается негативными эмоциями\n\n3. Триггеры эмоционального переедания:\n• Стресс на работе или учебе\n• Конфликты в отношениях\n• Финансовые проблемы\n• Одиночество или скука\n• Хроническая усталость'
      },
      {
        type: 'image',
        content: 'https://images.unsplash.com/photo-1517837125937-53df2a3ca6c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80'
      },
      {
        type: 'subheading',
        content: 'Диагностика и самоанализ'
      },
      {
        type: 'paragraph',
        content: '1. Ведение дневника:\n• Записывайте время приемов пищи\n• Отмечайте уровень голода по шкале от 1 до 10\n• Фиксируйте эмоции до и после еды\n• Описывайте ситуации, провоцирующие переедание\n\n2. Анализ паттернов:\n• Выявление повторяющихся триггеров\n• Определение времени суток, когда чаще происходит переедание\n• Идентификация "комфортных" продуктов\n• Понимание эмоциональных состояний, ведущих к перееданию\n\n3. Оценка физических сигналов:\n• Различение физического и эмоционального голода\n• Наблюдение за скоростью приема пищи\n• Внимание к сигналам насыщения\n• Отслеживание энергетического уровня'
      },
      {
        type: 'image',
        content: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80'
      },
      {
        type: 'subheading',
        content: 'Стратегии преодоления'
      },
      {
        type: 'paragraph',
        content: '1. Эмоциональная регуляция:\n• Практика медитации и дыхательных упражнений\n• Регулярная физическая активность\n• Ведение дневника эмоций\n• Техники релаксации и управления стрессом\n\n2. Изменение пищевого поведения:\n• Планирование приемов пищи\n• Создание здоровой пищевой среды дома\n• Практика осознанного питания\n• Замедление темпа приема пищи\n\n3. Альтернативные способы справляться со стрессом:\n• Прогулки на свежем воздухе\n• Занятия любимым хобби\n• Общение с близкими\n• Творческая деятельность'
      },
      {
        type: 'image',
        content: 'https://images.unsplash.com/photo-1499728603263-13726abce5fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80'
      },
      {
        type: 'subheading',
        content: 'Практические техники'
      },
      {
        type: 'paragraph',
        content: '1. Техника "Пауза":\n• Остановитесь перед тем, как начать есть\n• Сделайте несколько глубоких вдохов\n• Оцените свой уровень голода\n• Определите истинную причину желания поесть\n\n2. Метод "5-4-3-2-1":\n• Назовите 5 вещей, которые вы видите\n• 4 вещи, которые вы можете потрогать\n• 3 звука, которые вы слышите\n• 2 запаха, которые вы чувствуете\n• 1 вкус, который вы ощущаете\n\n3. Практика осознанного питания:\n• Ешьте без отвлечений на гаджеты\n• Используйте все органы чувств\n• Делайте паузы между укусами\n• Наслаждайтесь вкусом и текстурой'
      },
      {
        type: 'subheading',
        content: 'Создание поддерживающей среды'
      },
      {
        type: 'paragraph',
        content: '1. Организация пространства:\n• Уберите триггерные продукты\n• Храните здоровые перекусы\n• Создайте комфортное место для приема пищи\n• Поддерживайте порядок на кухне\n\n2. Социальная поддержка:\n• Поделитесь проблемой с близкими\n• Найдите группу поддержки\n• Обратитесь к специалисту при необходимости\n• Создайте систему отчетности\n\n3. Профилактика срывов:\n• Разработайте план действий при стрессе\n• Подготовьте список альтернативных активностей\n• Практикуйте регулярный самоанализ\n• Отмечайте и празднуйте успехи'
      }
    ],
    readTime: 12,
    views: 2104,
    date: '11 марта 2024'
  },
  'meal-planning': {
    id: '6',
    title: 'Планирование питания: как составить меню на неделю',
    description: 'Подробное руководство по составлению сбалансированного меню на неделю: от планирования до реализации, с учетом бюджета и времени.',
    mainImage: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
    content: [
      {
        type: 'paragraph',
        content: 'Планирование питания – это не просто составление списка блюд, а целая стратегия, которая поможет вам наладить здоровое питание, сэкономить время и деньги, а также избежать импульсивных покупок и нездоровых перекусов. В этой статье мы подробно разберем, как создать эффективный план питания на неделю и придерживаться его.'
      },
      {
        type: 'subheading',
        content: 'Преимущества планирования'
      },
      {
        type: 'paragraph',
        content: '1. Экономия времени:\n• Меньше времени на ежедневные решения о еде\n• Оптимизация походов в магазин\n• Возможность готовить впрок\n\n2. Экономия денег:\n• Отсутствие импульсивных покупок\n• Оптимизация закупок продуктов\n• Минимизация пищевых отходов\n\n3. Здоровье:\n• Сбалансированный рацион\n• Контроль порций\n• Разнообразное питание\n\n4. Психологические преимущества:\n• Снижение стресса от принятия решений\n• Лучший контроль над питанием\n• Формирование здоровых привычек'
      },
      {
        type: 'image',
        content: 'https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80'
      },
      {
        type: 'subheading',
        content: 'Подготовительный этап'
      },
      {
        type: 'paragraph',
        content: '1. Анализ текущей ситуации:\n• Оцените свой обычный режим питания\n• Определите количество приемов пищи\n• Учтите особенности рациона всех членов семьи\n• Проанализируйте доступное время на готовку\n\n2. Определение целей:\n• Здоровое питание\n• Экономия времени\n• Снижение расходов\n• Разнообразие в рационе\n\n3. Оценка ресурсов:\n• Бюджет на продукты\n• Время на приготовление\n• Кухонное оборудование\n• Место для хранения'
      },
      {
        type: 'image',
        content: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80'
      },
      {
        type: 'subheading',
        content: 'Составление плана меню'
      },
      {
        type: 'subheading',
        content: 'Шаг 2: Составление списка блюд'
      },
      {
        type: 'paragraph',
        content: '1. Структура недельного меню:\n• Завтраки: быстрые и питательные\n• Обеды: сбалансированные основные блюда\n• Ужины: легкие и разнообразные\n• Перекусы: здоровые и удобные\n\n2. Принципы составления:\n• Чередование белковых источников\n• Разнообразие круп и гарниров\n• Сезонные овощи и фрукты\n• Учет сроков хранения продуктов\n\n3. Практические советы:\n• Планируйте повторное использование ингредиентов\n• Учитывайте возможность заготовки впрок\n• Оставляйте место для гибкости\n• Включайте любимые блюда семьи'
      },
      {
        type: 'image',
        content: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80'
      },
      {
        type: 'subheading',
        content: 'Организация покупок'
      },
      {
        type: 'paragraph',
        content: '1. Составление списка:\n• Группировка по категориям продуктов\n• Учет количества и объемов\n• Проверка наличия продуктов дома\n• Добавление базовых продуктов\n\n2. Оптимизация покупок:\n• Выбор подходящих магазинов\n• Использование сезонных скидок\n• Покупка оптом выгодных позиций\n• Учет сроков хранения\n\n3. Хранение продуктов:\n• Правильная организация холодильника\n• Использование контейнеров\n• Маркировка и датировка\n• Ротация продуктов'
      },
      {
        type: 'subheading',
        content: 'Практическая реализация'
      },
      {
        type: 'paragraph',
        content: '1. Подготовка продуктов:\n• Мытье и нарезка овощей\n• Порционирование продуктов\n• Заготовка базовых соусов\n• Маринование белковых продуктов\n\n2. Организация готовки:\n• Приготовление базовых блюд\n• Использование техники batch cooking\n• Заморозка порционных блюд\n• Планирование разогрева'
      },
      {
        type: 'image',
        content: 'https://images.unsplash.com/photo-1543352634-99a5d50ae78e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80'
      },
      {
        type: 'subheading',
        content: 'Поддержание системы'
      },
      {
        type: 'paragraph',
        content: '1. Регулярный анализ:\n• Оценка эффективности плана\n• Корректировка порций\n• Обновление рецептов\n• Учет сезонности\n\n2. Решение проблем:\n• Планирование альтернативных блюд\n• Гибкость при изменениях\n• Учет отзывов семьи\n• Оптимизация процессов\n\n3. Полезные привычки:\n• Регулярная инвентаризация\n• Ведение кулинарного дневника\n• Сбор любимых рецептов\n• Обмен опытом с другими'
      }
    ],
    readTime: 10,
    views: 1832,
    date: '10 марта 2024'
  }
};

const relatedArticles = [
  {
    id: '3',
    title: '10 простых способов уменьшить калорийность блюд',
    description: 'Эффективные кулинарные приемы, которые помогут сделать любимые блюда менее калорийными без потери вкуса.',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
    slug: 'reduce-calories'
  },
  {
    id: '4',
    title: 'Правильный перекус: что есть между приемами пищи',
    description: 'Список полезных перекусов, которые помогут контролировать голод и поддерживать стабильный уровень энергии.',
    image: 'https://images.unsplash.com/photo-1511690078903-71dc5a49f5e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
    slug: 'healthy-snacks'
  },
  {
    id: '5',
    title: 'Как справиться с эмоциональным перееданием',
    description: 'Практические стратегии и техники, которые помогут разорвать связь между эмоциями и приемом пищи.',
    image: 'https://images.unsplash.com/photo-1499744937866-d7e566a20a61?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
    slug: 'emotional-eating'
  }
];

export default function ArticleContent() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? articlesContent[slug] : null;

  if (!article) {
    return <div>Статья не найдена</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Хлебные крошки */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-green-500 transition-colors flex items-center gap-1 shrink-0">
            <Home className="w-4 h-4" />
            Главная
          </Link>
          <ChevronRight className="w-4 h-4 shrink-0" />
          <Link to="/articles" className="hover:text-green-500 transition-colors shrink-0">
            Статьи
          </Link>
          <ChevronRight className="w-4 h-4 shrink-0" />
          <span className="text-gray-900 truncate" style={{ maxWidth: '300px' }}>
            {article.title}
          </span>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Заголовок и мета-информация */}
          <div className="relative h-96">
            <img
              src={article.mainImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{article.readTime} мин</span>
                </div>
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-2" />
                  <span>{article.views}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Контент статьи */}
          <div className="p-8">
            <div className="prose prose-lg max-w-none space-y-6">
              {article.content.map((block, index) => {
                switch (block.type) {
                  case 'paragraph':
                    return (
                      <div key={index} className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {block.content.split('\n').map((text, i) => {
                          if (text.startsWith('•')) {
                            return (
                              <div key={i} className="flex items-start gap-2 mt-2">
                                <span className="text-green-500 font-bold">•</span>
                                <span>{text.slice(1).trim()}</span>
                              </div>
                            );
                          }
                          return <p key={i} className="mt-2">{text}</p>;
                        })}
                      </div>
                    );
                  case 'subheading':
                    return (
                      <h2 key={index} className="text-2xl font-bold text-gray-900 mt-12 mb-6 pb-2 border-b border-gray-200">
                        {block.content}
                      </h2>
                    );
                  case 'image':
                    return (
                      <div key={index} className="my-12">
                        <img
                          src={block.content}
                          alt="Иллюстрация к статье"
                          className="w-full rounded-xl shadow-lg"
                        />
                      </div>
                    );
                  default:
                    return null;
                }
              })}
            </div>
          </div>
        </motion.div>

        {/* Баннер с призывом к действию */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16 mb-20 bg-green-500 rounded-[32px] shadow-lg overflow-hidden"
        >
          <div className="p-8 sm:p-12">
            <div className="flex flex-col items-start">
              <div className="bg-white rounded-xl p-3 mb-6">
                <Brain className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-6">
                Персональный план питания
              </h3>
              <p className="text-white/90 text-xl mb-8 max-w-2xl">
                Получите индивидуальный план питания, созданный с помощью ИИ с учетом ваших целей и предпочтений
              </p>
              <button
                onClick={() => navigate('/quiz')}
                className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold hover:bg-green-50 transition-colors inline-flex items-center group text-lg"
              >
                Создать план
                <ChevronRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Другие статьи */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Читайте также</h2>
          <div className="grid gap-8">
            {relatedArticles.map((relatedArticle) => (
              <Link
                key={relatedArticle.id}
                to={`/articles/${relatedArticle.slug}`}
                className="block bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 h-full"
              >
                <div className="flex flex-col sm:flex-row h-full">
                  <div className="sm:w-1/3 relative">
                    <img
                      src={relatedArticle.image}
                      alt={relatedArticle.title}
                      className="w-full h-48 sm:h-full object-cover absolute inset-0"
                    />
                  </div>
                  <div className="flex-1 p-6 sm:min-h-[200px]">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {relatedArticle.title}
                    </h3>
                    <p className="text-gray-600">
                      {relatedArticle.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}