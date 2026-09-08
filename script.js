const WHATSAPP_NUMBER = '254182095210';
const PROVIDERS = [
  { name: 'Sophia', photo: 'assets/providers/sophia.jpg' },
  { name: 'Amelia', photo: 'assets/providers/amelia.jpg' },
  { name: 'Isla', photo: 'assets/providers/isla.jpg' },
  { name: 'Charlotte', photo: 'assets/providers/charlotte.jpg' },
  { name: 'Nora', photo: 'assets/providers/nora.jpg' },
  { name: 'Maya', photo: 'assets/providers/maya.jpg' },
  { name: 'Aria', photo: 'assets/providers/aria.jpg' },
  { name: 'Violet', photo: 'assets/providers/violet.jpg' },
  { name: 'Elena', photo: 'assets/providers/elena.jpg' }
];
const modal = document.querySelector('#bookingModal');
const providerStep = document.querySelector('#providerStep');
const bookingForm = document.querySelector('#bookingForm');
const providerGrid = document.querySelector('#providerGrid');
const continueBooking = document.querySelector('#continueBooking');
const selectedProvider = document.querySelector('#selectedProvider');
let provider = null;

const serviceSelect = bookingForm.querySelector('select[name="service"]');
serviceSelect.querySelectorAll('option').forEach((option) => {
  if (option.textContent.toLowerCase().includes('sensual')) option.remove();
});
if (![...serviceSelect.options].some((option) => option.value === 'Thai Massage')) {
  serviceSelect.add(new Option('Thai Massage', 'Thai Massage'));
}
if (![...serviceSelect.options].some((option) => option.value === 'Complete Reset Package - KES 10,000')) {
  serviceSelect.add(new Option('Complete Reset Package - KES 10,000', 'Complete Reset Package - KES 10,000'));
}

function whatsappUrl(message = '') {
  return `https://wa.me/${WHATSAPP_NUMBER}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
}
function openWhatsApp(message) { window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer'); }
function openBooking() {
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeBooking() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('[data-book]').forEach((button) => button.addEventListener('click', openBooking));
document.querySelectorAll('[data-close-modal]').forEach((button) => button.addEventListener('click', closeBooking));
document.querySelectorAll('[data-whatsapp]').forEach((button) => button.addEventListener('click', () => openWhatsApp('Hello THE SWEET FINISH, I would like to ask about your treatments.')));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeBooking(); });

toggleProviders();
function toggleProviders() {
  providerGrid.innerHTML = PROVIDERS.map((item) => `<button type="button" class="provider-card" data-provider="${item.name}"><img src="${item.photo}" alt="${item.name}" onerror="this.src='assets/provider-placeholder.svg'"><span>${item.name}</span></button>`).join('');
  providerGrid.querySelectorAll('[data-provider]').forEach((button) => button.addEventListener('click', () => {
    provider = button.dataset.provider;
    providerGrid.querySelectorAll('.provider-card').forEach((card) => card.classList.toggle('selected', card === button));
    continueBooking.disabled = false;
  }));
}
continueBooking.addEventListener('click', () => {
  if (!provider) return;
  providerStep.hidden = true;
  bookingForm.hidden = false;
  selectedProvider.textContent = `Service provider: ${provider}`;
});
bookingForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const values = new FormData(bookingForm);
  const message = `Hello, I would like to make a booking.\n\nName: ${values.get('name')}\nPhone: ${values.get('phone')}\nService: ${values.get('service')}\nService Provider: ${provider}\nDate: ${values.get('date')}\nTime: ${values.get('time')}\n\nPlease confirm my booking.`;
  openWhatsApp(message);
});

document.querySelector('.menu-toggle').addEventListener('click', (event) => {
  const nav = document.querySelector('.mobile-nav');
  const open = nav.classList.toggle('open');
  event.currentTarget.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.mobile-nav a').forEach((link) => link.addEventListener('click', () => document.querySelector('.mobile-nav').classList.remove('open')));
