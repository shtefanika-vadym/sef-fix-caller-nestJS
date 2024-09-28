import * as twilio from 'twilio';
import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import VoiceResponse from 'twilio/lib/twiml/VoiceResponse';

@Injectable()
export class CallerService {
  private readonly logger = new Logger(CallerService.name);
  private readonly twilioClient: twilio.Twilio;

  public constructor(private readonly cfg: ConfigService) {
    this.twilioClient = twilio(
      this.cfg.get<string>('TWILIO_ACCOUNT_SID'),
      this.cfg.get<string>('TWILIO_AUTH_TOKEN'),
    );
  }

  call(redirectCallTo: string) {
    const to = this.cfg.get('TARGET_PHONE_NUMBER');
    const from = this.cfg.get('TWILIO_PHONE_NUMBER');

    this.logger.log(`Calling from: ${from} to: ${to}`);
    return this.twilioClient.calls.create({
      to,
      from,
      url: `${this.cfg.get('HOST')}/handle-interaction?redirectCallTo=${redirectCallTo}`,
    });
  }

  handleInteraction(redirectCallTo: string): string {
    const twiml: VoiceResponse = new twilio.twiml.VoiceResponse();

    // Pause 20 sec
    // twiml.pause({ length: 20 });

    // Press digit 1
    // twiml.play({ digits: '1' });

    this.logger.log(`Redirecting call to: ${redirectCallTo}`);
    // Redirect the call
    twiml.dial(redirectCallTo);
    return twiml.toString();
  }
}
