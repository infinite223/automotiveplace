<h3>Project - projekt samochodowy</h3>

Dla użytkowników projektem jest tak naprawdę każdy samochód lekko lub bardziej zmodyfikowany pod względem wizualnym, lub mechanicznym.

Po co taka część aplikacji?

Takie projekty bardzo często użytkownicy udostępniają na innych mediach społecznościowych takich jak facebook, instagram, youtube. Tutaj jednak aplikacja ma, ten moduł ma być spersonalizowany konkretnie dla samochodów, pojazdów zmodyfikowanych, sam projekt w aplikacji może zawierać mnóstwo różnych danych takich jak model, pojemność, przyśpieszenia, zdjęcia, modyfikacje. Taki projekt inny użytkownicy mogą łatwo wyszukać w aplikacji, filtrowanie.

Dla aplikacji jest to podstawowy i najważniejszy moduł, który opiera się na możliwości dodawaniu nowego projektu przez użytkownika, wszystkich jego danych, zdjęć itp.

Co może zawierać taki projekt?

- autora
- zdjęcia pojazdu
- podstawowe dane techniczne (orginalne/stock)
- etapy modyfikacji
- tagi
- podzespoły samochodu

- informacje czy jest na sprzedaż, czy jest widoczny, czy jest zweryfikowany.

Jakie rzeczy można robić z takim projektem?

- Autor może go utworzyć, edytować w przyszłości.
- Użytkownik może polubić dany projekt.
- Autor może promować daną firmę tuningową poprzez ogłaszanie jej w modyfikacjach.
- Autor może ogłosić projekt na sprzedaż.
- Autor może pobrać PDF jako wizytówkę takiego projektu.
- Można go wyszukiwać po nazwie, modelu, mocy, tagach
- Można go udostępnić dla innych

<h3>Architektura aplikacji:</h4>

Widoki w aplikacji:

1. MiniProjectView:

- pokazuje najważniejsze rzeczy związane z projektem (główne zdjęcie projektu, najważniejsze parametry, moc, etap modyfikacji, autora...)
- widok jest dostępny w głównym oknie, tam gdzie cały kontent strony, jest on wyświetlany razem z postami, spotami, problemami.

możliwości w tym widoku?

- nawigowanie do MainProjectView
- polubienie
- nawigowanie do chatu z autorem/profilu

2. MainProjectView

- główny widok projektu który przedstawia wszystkie istniejące dane o projekcie
- widok jest dostępny po kliknięciu na widok "MiniProjectView" oraz w innych przypadkach.

możliwości w tym widoku:

- polubienie
- nawigowanie do chatu z autorem/profilu
- edycja projektu dla autora
- sprawdzenie na jakich spotach/wydarzeniach był ten projekt

3. ProjectCreateView

- widok, który umożliwia dodanie projektu do apliakcji
- jest dostępny po wybraniu opcji "Dodaj projekt"

możliwości w tym widoku:

- ustawienie zdjęć
- podstawowych danych
- dodanie etapów modyfikacji
- ustawienia dodatkowe (widoczność, na sprzedaż)
- dodanie tagów

4. RowMiniProjectView

- pokazuje najważniejsze dane dla projektu
- może być wykorzystany w wybieraniu projektu do wydarzenia lub spotu

możliwości w tym widoku:

- nawigowanie do MainProjectView
- polubienie
- nawigowanie do chatu z autorem/profilu
