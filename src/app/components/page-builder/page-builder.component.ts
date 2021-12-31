import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../services/data.service';
import {AuthService} from '../../services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PhoneNumberValidator} from '../../helpers/PhoneNumberValidator';
import {User} from '../../models/user';
import {LinkType} from '../../models/socialMediaLink';
import {faFacebook, faGithub, faLinkedin, faTwitter} from '@fortawesome/free-brands-svg-icons';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Education} from '../../models/education';
import {WorkHistory} from '../../models/workHistory';
import {Router} from '@angular/router';
import {ImageSelectorComponent} from '../image-selector/image-selector.component';

@Component({
  selector: 'app-page-builder',
  templateUrl: './page-builder.component.html',
  styleUrls: ['./page-builder.component.scss']
})
export class PageBuilderComponent implements OnInit, AfterViewInit {

  @Input() user: User;
  @ViewChild('imageSelector') imageSelector: ImageSelectorComponent;

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  editFormGroup: FormGroup;
  image: string;
  sendDisabled = false;
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faGithub = faGithub;
  faLinkedin = faLinkedin;
  faPlus = faPlus;
  languages = [];
  specialSkills = [];

  get editForm(): any {
    return this.editFormGroup ? this.editFormGroup.controls : undefined;
  }

  get workHistories(): FormArray {
    return this.editFormGroup.get('workHistories') as FormArray;
  }

  get educations(): FormArray {
    return this.editFormGroup.get('educations') as FormArray;
  }

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    public authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngAfterViewInit(): void {
    if (!this.authService.isAuthenticated() && !this.image) {
      this.fetchRandomImage();
    }
  }

  private initForm(): void {
    if (!this.authService.isAuthenticated()) {
      this.editFormGroup = this.formBuilder.group({...this.getRegisterForm()});
    } else {
      this.editFormGroup = this.formBuilder.group({
        ...this.getSuitableFields(this.user ? this.user.accountType : 'user'),
        accountType: [this.user ? this.user.accountType : 'user', Validators.required],
        email: [this.user ? this.user.email : '', [Validators.required, Validators.email]],
        phone: [this.user ? this.user.phone : '', PhoneNumberValidator('FI')],
        website: [this.user ? this.user.website : ''],
        location: [this.user ? this.user.location : ''],
        description: [this.user.description ? this.user.description : '', [Validators.max(1000)]],
        image: [this.user.image],
        theme: [this.user.theme],
        facebook: [this.user ? this.getSocialMediaLink(this.user, LinkType.Facebook) : ''],
        twitter: [this.user ? this.getSocialMediaLink(this.user, LinkType.Twitter) : ''],
        github: [this.user ? this.getSocialMediaLink(this.user, LinkType.Github) : ''],
        linkedin: [this.user ? this.getSocialMediaLink(this.user, LinkType.Linkedin) : ''],
        handle: [this.user ? this.user.handle : '']
      });

      this.image = this.user.image;
      this.languages = this.user.languages?.split(', ').filter(Boolean) ?? [];
      this.specialSkills = this.user.specialSkills?.split(', ').filter(Boolean) ?? [];

      this.user.workHistories?.forEach((workHistory: WorkHistory) => {
        this.addWorkHistoryFormGroup(workHistory);
      });

      this.user.educations?.forEach((education: Education) => {
        this.addEducationFormGroup(education);
      });

      this.editFormGroup.get('accountType').disable();
      this.editFormGroup.get('email').disable();
    }
  }

  private getSuitableFields(accountType: string): any {
    if (accountType === 'user') {
      return {
        firstName: [this.user ? this.user.firstName : '', Validators.required],
        lastName: [this.user ? this.user.lastName : '', Validators.required],
        title: [this.user ? this.user.title : ''],
        workHistories: this.formBuilder.array([]),
        educations: this.formBuilder.array([]),
      };
    } else if (accountType === 'company') {
      return {
        companyName: [this.user ? this.user.companyName : '', Validators.required]
      };
    }
  }

  private getRegisterForm(accountType?: string): any {
    return {
      accountType: [accountType ?? 'user', Validators.required],
      ...this.getSuitableFields(accountType ?? 'user'),
      email: [this.user ? this.user.email : '', [Validators.required, Validators.email]],
      phone: [this.user ? this.user.phone : '', PhoneNumberValidator('FI')],
      website: [this.user ? this.user.website : ''],
      location: [this.user ? this.user.location : ''],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$')]],
      passwordAgain: ['', Validators.required],
      image: []
    };
  }

  addWorkHistoryFormGroup(workHistory?: WorkHistory): void {
    const workHistoryGroup = this.formBuilder.group({
      workplace: [workHistory?.workplace ?? '', Validators.required],
      title: [workHistory?.title ?? '', Validators.required],
      period: [workHistory?.period ?? '', Validators.required],
      description: [workHistory?.description ?? '', Validators.required]
    });

    this.workHistories.push(workHistoryGroup);
  }

  addEducationFormGroup(education?: Education): void {
    const educationGroup = this.formBuilder.group({
      educationPlace: [education?.educationPlace ?? '', Validators.required],
      title: [education?.title ?? '', Validators.required],
      period: [education?.period ?? '', Validators.required],
      description: [education?.description ?? '', Validators.required]
    });

    this.educations.push(educationGroup);
  }

  fetchRandomImage(): void {
    this.imageSelector.fetchRandomImage();
  }

  validatePasswords(): void {
    if (this.editForm.password.value !== this.editForm.passwordAgain.value) {
      this.editForm.passwordAgain.setErrors({noMatch: true});
    }
  }

  validateEmail(): void {
    this.editForm.email.setErrors(undefined);

    const emailRegEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegEx.test(this.editForm.email.value)) {
      this.editForm.email.setErrors({emailNotValid: true});
      this.editFormGroup.updateValueAndValidity();
      return;
    }

    this.dataService.checkEmailExists(this.editForm.email.value).subscribe({
      next: (emailExists) => {
        if (emailExists) {
          this.editForm.email.setErrors({alreadyExists: true});
        }

        this.editFormGroup.updateValueAndValidity();
      },
      error: (error) => {
        this.handleError(error);
      }
    });
  }

  validateHandle(): void {
    this.editForm.handle.setErrors(undefined);

    this.dataService.checkHandleExists(this.editForm.handle.value, this.user.id).subscribe({
      next: (handleExists) => {
        if (handleExists) {
          this.editForm.handle.setErrors({alreadyExists: true});
        }

        this.editFormGroup.updateValueAndValidity();
      },
      error: (error) => {
        this.handleError(error);
      }
    });
  }

  accountTypeChanged(): void {
    this.editFormGroup = this.formBuilder.group({
      ...this.getRegisterForm(this.editForm.accountType.value ?? 'user')
    });
  }

  limitDescriptionSize(): void {
    this.editForm.description?.setValue(this.editForm.description?.value.substring(0, 1000));
  }

  save(): void {
    this.sendDisabled = true;

    if (!this.user) {
      this.validatePasswords();
      this.validateEmail();
    }

    if (this.editFormGroup.valid) {
      const values = {...this.editFormGroup.value};
      values.languages = this.languages.join(', ');
      values.specialSkills = this.specialSkills.join(', ');
      values.id = this.user?.id;

      this.dataService.save(values).subscribe({
        next: (result) => {
          this.sendDisabled = false;

          this.snackBar.open(this.user ?
            'Muutokset tallennettu!' :
            'Tervetuloa käyttäjäksi ' + (result.user.firstName ?? result.user.companyName) + '!', 'Sulje');

          if (!this.user) {
            this.dataService.setToken(result.token);
            this.authService.setUser(result.user);
            this.initForm();
            setTimeout(() => {
              window.scroll(0, 0);
            }, 100);
          }
        },
        error: (error) => {
          this.handleError(error);
        }
      });
    } else {
      this.handleError();
    }
  }

  private getSocialMediaLink(user: User, type: LinkType): string {
    return user.socialMediaLinks?.find(socialMediaLink => socialMediaLink.type === type)?.link;
  }

  addChipToList(list: any, event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      list.push(value);
    }

    event.chipInput.clear();
  }

  removeFromList(list: any, index: number): void {
    if (list.splice) {
      list.splice(index, 1);
    } else if (list.removeAt) {
      list.removeAt(index);
    }
  }

  isUserForm(): boolean {
    return this.editForm.accountType.value === 'user';
  }

  isCompanyForm(): boolean {
    return this.editForm.accountType.value === 'company';
  }

  updateImage($event: string): void {
    this.editForm.image.setValue($event);
  }

  private handleError(error?: any): void {
    console.error(error);
    this.sendDisabled = false;
    this.snackBar.open('Tapahtui virhe!', 'Sulje');
  }

  openBusinessCard(): void {
    window.open('/#/jaa/' + this.user.handle, '_blank');
  }

  moveUp(list: FormArray, index: number): void {
    if (index - 1 >= 0) {
      [list.controls[index], list.controls[index - 1]] = [list.controls[index - 1], list.controls[index]];
    }
  }

  moveDown(list: FormArray, index: number): void {
    if (list.length > index + 1) {
      [list.controls[index], list.controls[index + 1]] = [list.controls[index + 1], list.controls[index]];
    }
  }
}
