export function customerRows(result) {
  const rows = result.map(person => ({
    party_id:person.party_id,
    name: person.first_name,
    surname: person.last_name,
    dob: person.date_of_birth,
    sort: person.sort_code,
    address: person.address_line_1,
    postcode:person.address_postcode
  }));
  console.log(rows)

  return rows
}

export function accountRows(result) {
  const rows = result.map(account => ({
    type: account.type,
    account_number: account.account_number,
    sort_code: account.sort_code
  }));
  console.log(rows)

  return rows
}
