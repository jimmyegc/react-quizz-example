1. Estructura del Estado con useQuizStore
useQuizStore: Este hook es el encargado de manejar el estado de todo el cuestionario, incluyendo el índice de la pregunta actual (currentQuestionIndex), las respuestas (answers), y funciones para seleccionar una respuesta (selectAnswer), avanzar a la siguiente pregunta (nextQuestion), regresar a la anterior (prevQuestion) o ir a una pregunta específica (goToQuestion).
Estados claves:
currentQuestionIndex: guarda el índice de la pregunta actual.
answers: es un array que guarda las respuestas seleccionadas.
2. Componente Quizz
Este es el componente principal que muestra las preguntas y permite la interacción del usuario.

Animación de Transición de Preguntas:
El estado animate y el useEffect controlan una animación al cambiar de pregunta, aplicando una clase fade-in-active para hacer el cambio más visualmente agradable.
Renderizado Condicional de Preguntas:
Cada pregunta se muestra de forma condicional usando isUnlocked y isCurrent.
isUnlocked: asegura que solo las preguntas desbloqueadas (ya respondidas o actuales) sean visibles.
isCurrent: indica si la pregunta es la actual para aplicar estilos específicos y enfocar la interacción en ella.
Control de Respuestas y Navegación:
Manejo de Respuestas: La función handleAnswerSelect guarda la respuesta seleccionada y llama a nextQuestion para avanzar a la siguiente pregunta.
Botones de Navegación: Los botones "Anterior" y "Siguiente" permiten moverse entre las preguntas, controlando que no se salga de los límites (primera y última pregunta).
3. Estilos y Representación Visual
Cada pregunta tiene un estilo visualmente distintivo:
isCurrent: resalta la pregunta actual.
isAnswered: muestra un fondo verde claro para las preguntas ya respondidas.
También se usan íconos (🔵 para actual y ✔️ para respondida) como indicadores visuales.
4. Desbloqueo de Preguntas
Cada pregunta se considera desbloqueada si está en el índice actual o si ya ha sido respondida. Esto permite al usuario ver solo las preguntas que ha contestado o la actual, manteniendo el flujo organizado.
Resumen Rápido
En general, el código muestra las preguntas de forma ordenada y controlada:

Guarda cada respuesta y desbloquea la siguiente pregunta cuando el usuario responde.
Permite la navegación entre preguntas ya respondidas y la pregunta actual.
Usa animaciones y estilos visuales para mejorar la experiencia de usuario.
Este flujo asegura que el usuario siga un camino progresivo en el cuestionario, mientras el código mantiene un estado claro y manejable de cada respuesta.