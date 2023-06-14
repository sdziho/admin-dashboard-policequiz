// eslint-disable-next-line import/no-anonymous-default-export
export default {
  ra: {
    action: {
      delete: "Ukloni",
      show: "Prikazati",
      list: "Lista",
      save: "Sačuvaj",
      create: "Kreiraj",
      edit: "Uredi",
      export: "Izvoz u CSV",
      cancel: "Otkazaj",
      refresh: "Osvježi",
      add_filter: "Dodajte filter",
      remove_filter: "Ukloni filter",
      back: "Nazad",
      search: "Pretraga",
      add: "Dodaj novi odgovor",
      remove: "Ukloni",
      bulk_actions: "Da li želite sve da uklonite?",
    },
    boolean: {
      true: "Da",
      false: "Ne",
    },
    page: {
      list: "Lista %{name}",
      edit: "%{name} #%{id}",
      show: "%{name} #%{id}",
      create: "Stvori %{name}",
      delete: "Ukloni %{name} #%{id}",
      dashboard: "Kontrolna ploča",
      not_found: "Nije pronađeno",
      empty: "Stranica je prazna",
      invite: "Kreirajte novi sadržaj",
    },
    input: {
      file: {
        upload_several:
          "Ispustite neke datoteke koje želite preuzeti ili kliknite da biste ih odabrali.",
        upload_single:
          "Ispustite datoteku koju želite preuzeti ili kliknite je da biste je odabrali.",
      },
      image: {
        upload_several:
          "Ispustite neke slike za prijenos ili kliknite da biste ih odabrali.",
        upload_single:
          "Ispustite sliku koju želite prenijeti ili kliknite je da biste je odabrali.",
      },
    },
    message: {
      yes: "Da",
      no: "Ne",
      are_you_sure: "Jeste li sigurni?",
      about: "Oko",
      not_found:
        "Jeste li unijeli pogrešan URL ili ste slijedili pogrešnu vezu?",
      invalid_form: "Formular nije validan. Molimo ispravite greške.",
    },
    navigation: {
      no_results: "Nema rezultata",
      page_out_of_boundaries: "Broj stranice %{page} je izvan granice",
      page_out_from_end: "Ne može se premašiti zadnja stranica",
      page_out_from_begin: "Ne mogu prijeći stranicu 1",
      page_range_info: "%{offsetBegin}-%{offsetEnd} od ukupno %{total}",
      page_rows_per_page: "Redova po stranici",
      next: "Napred",
      prev: "Nazad",
    },
    auth: {
      username: "Korisničko ime",
      password: "Lozinka",
      sign_in: "Prijavi se",
      sign_in_error: "Autentifikacija nije uspjela, pokušajte ponovo",
      logout: "Odjava",
    },
    notification: {
      updated: "Element je ažuriran",
      created: "Element je izrađen",
      deleted: "Element je uklonjen",
      item_doesnt_exist: "Element ne postoji",
      http_error: "Pogreška pri komunikaciji s poslužiteljem",
    },
    validation: {
      required: "Potreban",
      minLength: "Mora sadržavati najmanje %{min} znakova",
      maxLength: "Mora sadržavati najviše %{max} znakova ili manje",
      minValue: "Mora biti barem %{min}",
      maxValue: "Mora biti %{max} ili manje",
      number: "Mora biti broj",
      email: "Mora biti važeća e-adresa",
    },
  },
};
