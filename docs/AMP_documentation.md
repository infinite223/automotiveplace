<h3>Automotiveplace - AMP</h3>

1. Opis projektu

Aplikacja webowa/mobilna która ma za zadanie dać możliwość ludziom udostępnianie swoich zmodyfikowanych pojazdów, posiadanie w aplikacji własnego miejsca, garażu w którym będą różne podzespoły samochodowe. Głównym założeniem projektu jest stworzenie przestrzeni w której zbiorą się wszystkie osoby interesujące się motoryzacją.

2. Funkcjonalności

Wszystkie najważniejsze funkcjonalności aplikacji:

- Dodawanie projektu, zmodyfikowanego samochodu który może zawierać elementy, elementy zmodyfikowane, etapy projektu, zdjęcia, dodatkowe informacje, short video.

- Spoty -> mapa, dojazdy wspólne, czaty

- Problemy -> statusy, rozwiązania, komentarze

- Posty (nowy projekt, nowy spot, problem, jakaś informacja)

- Grupy

- Różne rodzaje kont (firma, zwykła osoba, premium, premium+)

- Wystawianie modyfikacji

- Konto Firmy -> dodatkowe funkcjonalności, promowanie, zaufanie, opinie

Każda część może posiadać informacje o tym w jakim aucie była zastosowana.

3. Problematyka projektu

Aplikacje tworzą ludzie, musi ona zaoferować znacznie więcej funkcjonalności, takich które nie wymagają interakcji ludzi, tak aby ułatwić start aplikacji w momencie gdy jest w niej mało osób. Aplikacja musi sprawiać i być bezpieczną, tak aby każdy maił do niej łatwy dostęp, powinna mieć możliwość logowania się za pomocą google.

4.  Moduły aplikacji

Aplikacja dzielić się może na kilka modułów, które są od siebie odseparowane.

- Garaż -> Projekty, podzespoły

- Spotkania (spoty) -> Najbliższe

- Problemy

- Profil

- Grupy

5. Bezpieczeństwo

Aplikacja musi posiadać pełen system rejestracji, logowania, z dodatkową walidacją po stronie backendu i frontu. Front musi być dobrze przemyślany pod kątem dostępności do poszczególnych routów, musi być też stale walidowany pod kątem rodzaju konta. Aplikacja musi oferować także autoryzacje za pomocą googla, stąd z góry trzeba przemyśleć pod to typy danych.

6. Dane w aplikacji (modele)
7. Architektura

Strony:

- Start page -> ekran przedstawiający projekt

- Logowanie/rejestracje -> reset hasła/przypomnienie

- Home page -> strona pokazująca najnowsze treści z bazy

- Projekty -> Projekty

- Garaż -> Projekty/Spotkania/podzespoły

- Spotkania -> Spotkanie

- Profil/Profile -> Wyszukiwanie konkretnych typów kont

- Problemy -> Problem

- Grupy

- Regulamin/polityka prywatności

- Edycja konta

- Ustawienia

- Dodawanie -> w garażu, w spotach, w projektach, w postach…

- Powiadomienia

- Chaty -> może tutaj context chat? -> muszą być grupowe chaty

8. Rozwiązania - > technologie

- Frontend: Aplikacja webowa -> Next.js
- Database: Postgres + Prisma
- Auth: Next-auth
- Google cloud storage -> dla zdjęć itp.

9. Wygląd

- Motywy aplikacji -> Ciemny i jasny
- Kolory:
  Main color -> #
- Czcionki:

Permanent Marker
