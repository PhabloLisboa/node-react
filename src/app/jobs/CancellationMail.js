import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { appointment } = data;

    Mail.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: 'Agendamento Cancelado',
      template: 'cancellation',
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: format(parseISO(appointment.date), "d' de 'MMMM', às' H:mm'h'", {
          locale: ptBR,
        }),
      },
    });
  }
}

export default new CancellationMail();
